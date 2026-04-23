# Discount Banner Configuration

The Discount Banner (`template: 4`) displays a promotional code that users can copy or automatically apply to their cart.

## Specific Fields in `IBannerTemplate` (`DiscountBannerTemplateSchema`)

* **`template`** (`number`): Must be `4` (`BannerTemplateType.DISCOUNT`).
* **`banner_text`** (`string`): The promotional message surrounding the discount code (e.g., "Use code below for 20% off!").
* **`discount_id`** (`string`, optional): The backend ID of the discount (e.g., Shopify PriceRule ID) to validate or apply.
* **`auto_apply_discount`** (`boolean`): If `true`, clicking the banner or an action button automatically applies the code to the user's session/cart. This is inherited from the base `CoreBannerTemplateSchema`.
* **`discount_style`** (`object`): Styling specifically for the coupon box itself (separate from the main banner background).
  * *Properties*:
    * `border` (`number`): Border style index.
    * `background` (`string`): Hex background color.
    * `text_color` (`string`): Hex text color.
    * `font_size` (`number`): Font size of the coupon text.

## Action & Coupon Fields (`ActionSchemaWithCoupon`)

* **`act_type`** (`number`): Action type (e.g., 0=None, 1=Link, 2=Button).
* **`act_text`** (`string`): CTA Button label.
* **`enable_coupon`** (`boolean`): Toggles the visibility of the coupon code block itself.
* **`coupon_code`** (`string`): The actual code string (e.g., `SUMMER50`).
* **`btn_style`** (`number`): Style index.
* **`act_content_color`** (`string`): Hex color.
* **`btn_text_color`** (`string`): Hex color.
* **`btn_copy`** (`object`): 
  * `text_copy` (`string`): Label for copying (e.g., "Copy Code").
  * `success_mess` (`string`): Success label (e.g., "COPIED ✅").
* **`content_gap`** (`number`): Spacing between components.
* **`content_order`** (`string`, optional): Display order (e.g., 'text,coupon,action').

## Shared Core Template Fields (`CoreBannerTemplateSchema`)

Inherits typical visual options:
* **`bg_type`**, **`bg_color`**, **`bg_opacity`**, **`bg_gradient`**
* **`font_family`**, **`font_color`**, **`font_size_button`**
* **`border_width`**, **`border_radius`**, **`border_color`**, **`border_style`**
* **`bg_padding`**, **`mobile_padding_enabled`**, etc.
* **`clickable`** (`boolean`), **`redirect_url`** (`string`, optional)

## `IBannerConfig` Fields (`DiscountBannerSchema`)

* Uses the standard `CoreBannerSchema` config. All scheduling, geographical, and page targeting rules apply identically.