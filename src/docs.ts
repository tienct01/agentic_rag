import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";

const directoryLoader = new DirectoryLoader("docs/specific/", {
  ".md": (path: string) => new TextLoader(path),
});

export const specificDocs = await directoryLoader.load();


