import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createClient } from "redis";
import { z } from "zod";
import dotenv from "dotenv";
import { specificDocs } from "./docs.js";
import readline from "readline/promises";

dotenv.configDotenv({
  path: ".env",
});

const client = createClient({
  url: "redis://127.0.0.1:6379",
});

await client.connect();

export const selectBannerDocs = (bannerType: number) => {
  let docsFileName = "single-announcement-banner";
  switch (bannerType) {
    case 0:
      docsFileName = "single-announcement-banner";
      break;
    case 1:
      docsFileName = "rotate-announcement-banner";
      break;
    case 2:
      docsFileName = "running-announcement-banner";
      break;
    case 3:
      docsFileName = "discount-banner";
      break;
    case 4:
      docsFileName = "countdown-banner";
      break;
    case 5:
      docsFileName = "email-signup-banner";
      break;
    case 6:
      docsFileName = "free-shipping-banner";
      break;
    case 7:
      docsFileName = "multi-banner";
      break;
  }

  return specificDocs.find((docs) =>
    docs.metadata.source.includes(docsFileName),
  );
};

const State = Annotation.Root({
  query: Annotation<string>(),
  bannerType: Annotation<number>(),
  docs: Annotation<string>(),
  selectedImage: Annotation<string>(),
  generatedConfig: Annotation<any>(),
  reason: Annotation<string>(),
});

const selectBannerType = async (state: typeof State.State) => {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
  });

  const prompt = `From user query, select banner type to create:

**List of banner type**
- single announcement banner: 0
- rotate announcement banner: 1
- running announcement banner: 2
- discount banner: 3
- countdown banner: 4
- email signup banner: 5
- free shipping banner: 6
- multi banner: 7

**Rules**
- Get the result as index of banner type
- If in user query, does not have any info relate with these type of banner, return -1

Query: ${state.query}`;

  const schema = z.object({
    bannerType: z
      .number()
      .describe("Index of type banner, allowed values 0 - 7, or -1 if unknown"),
  });

  const llmWithStructuredOutput = llm.withStructuredOutput(schema);
  const result = await llmWithStructuredOutput.invoke([
    new HumanMessage(prompt),
  ]);

  let bannerType = result.bannerType;
  if (bannerType === -1) {
    const tempRl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = await tempRl.question(
      "Could not determine banner type. Please enter a banner type (0-7) [default: 0]: "
    );
    tempRl.close();
    bannerType = answer.trim() === "" ? 0 : parseInt(answer, 10);
    if (isNaN(bannerType) || bannerType < 0 || bannerType > 7) {
      bannerType = 0;
    }
  }

  return { bannerType };
};

const getBannerDocs = async (state: typeof State.State) => {
  const docs = selectBannerDocs(state.bannerType);
  return { docs: docs?.pageContent || "" };
};

const generateConfig = async (state: typeof State.State) => {
  const llm = new ChatOpenAI({
    modelName: "gpt-5-mini",
  });

  const schema = z.object({
    generated_config: z
      .string()
      .describe("The generated json config in format follow docs"),
  });

  const llmWithStructuredOutput = llm.withStructuredOutput(schema);

  const systemPrompt = `You are a senior banner-config assistant.

Your job:
- Convert the user request into a valid banner configuration.
- Follow the documented banner schema and field semantics exactly.
- Do not invent field that not indicate in docs.

Knowledge and tools:
- Retrieved documentation context is the source of truth for structure and allowed fields.
- You can use the provided selectedImage if background image is needed.

Output contract:
- You must return structured output matching:
  - reason: short explanation of decisions
  - generated_config: a JSON string
- "generated_config" must be:
  - valid JSON string (parseable)
  - correct schema shape based on docs
  - only include fields supported by docs
  - no comments, no markdown, no trailing commas

Query: ${state.query}
Banner Type: ${state.bannerType}
Selected Image: ${state.selectedImage || "None"}

Docs:
${state.docs}
`;

  const result = await llmWithStructuredOutput.invoke([
    new SystemMessage(systemPrompt),
  ]);

  return {
    generatedConfig: result.generated_config,
  };
};

const graph = new StateGraph(State)
  .addNode("selectBannerType", selectBannerType)
  .addNode("getBannerDocs", getBannerDocs)
  .addNode("generateConfig", generateConfig)
  .addEdge(START, "selectBannerType")
  .addEdge("selectBannerType", "getBannerDocs")
  .addEdge("getBannerDocs", "generateConfig")
  .addEdge("generateConfig", END);

const app = graph.compile();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

while (true) {
  const input = await rl.question("Enter your prompt: ");

  if(input == "") {
    continue;
  }

  if (input == "exit") {
    await client.disconnect();
    process.exit(0);
  }

  const result = await app.invoke({
    query: input,
  });

  console.log("Result:", result);
}
