# Email Signup Banner Configuration

The Email Signup Banner (`template: 2`) is used to collect user emails, phone numbers, and consent for marketing purposes.

## Specific Fields in `IBannerTemplate` (`EmailBannerTemplateSchema`)

* **`template`** (`number`): Must be `2` (`BannerTemplateType.EMAIL_SIGNUP`).
* **`banner_text`** (`EmailBannerText`): Object containing text states for the form.
  * *Properties*:
    * `default` (`string`): The message shown initially (e.g., "Sign up to our newsletter").
    * `success` (`string`): The message shown after successful submission (e.g., "Thank you for subscribing!").
* **`form_structure`** (`EmailSignupFormStructure`, optional): Deep configuration of the form inputs.
  * *Properties*: `bannerGap` (`number`), `fieldGap` (`number`), `inputBGColor` (`string`), `inputTextColor` (`string`), `structures` (Array of `EmailStructure` defining inputs like email, phone, name, checkboxes).
* **`content_order`** (`string`, optional): Layout order, typically `'text,form,action'`.
* **`coupon_source`** (`number`, optional): Where the discount originates from (e.g., `0` for none, `1` for synced from Shopify, `2` for Custom).
* **`discount_id`** (`string`, optional): The backend ID of the discount to validate or apply upon sign-up.

## Action & Coupon Fields (`ActionSchemaWithCoupon`)

* **`act_type`** (`number`): The type of submit action element displayed. 
* **`act_text`** (`string`): The text label displayed inside the submit button (e.g., "Subscribe Now").
* **`enable_coupon`** (`boolean`): Toggles the visibility of a coupon code block that might be revealed after sign-up.
* **`coupon_code`** (`string`): The actual code string (e.g., `WELCOME10`).
* **`btn_style`** (`number`): Style index.
* **`act_content_color`** (`string`): Background color of the CTA button.
* **`btn_text_color`** (`string`): Text color of the CTA button.
* **`btn_copy`** (`object`): 
  * `text_copy` (`string`): Label for copying the code.
  * `success_mess` (`string`): Success label (e.g., 'COPIED ✅').
* **`content_gap`** (`number`): Spacing between form fields and text.

## Shared Core Template Fields (`CoreBannerTemplateSchema`)

Inherits typical visual options:
* **`bg_type`**, **`bg_color`**, **`bg_opacity`**, **`bg_gradient`**
* **`font_family`**, **`font_color`**, **`font_size_button`**
* **`border_width`**, **`border_radius`**, **`border_color`**, **`border_style`**
* **`bg_padding`**, **`mobile_padding_enabled`**, etc.
* **`clickable`** (`boolean`), **`redirect_url`** (`string`, optional)

## Specific Fields in `IBannerConfig` (`EmailBannerSchema`)

The global settings for the Email Signup Banner build upon the `CoreBannerSchema` by adding integration capabilities.

* **`email_integrations`** (`BannerIntegration`, optional/nullable): Configures synchronization with external apps.
  * *Properties*:
    * `shopify` (`object`): `{ enabled: boolean, tags: string }`
    * `klaviyo` (`object`): `{ enabled: boolean, listId: string }`
    * `omnisend` (`object`): `{ enabled: boolean, tags: string }` (if applicable)

All standard scheduling, geographical, and page targeting rules from `CoreBannerSchema` also apply.