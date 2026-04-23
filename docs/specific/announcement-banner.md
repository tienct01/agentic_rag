# Announcement Banner Configuration

The Announcement Banner is the simplest banner type, used to display promotional text, images, marquees, and call-to-action buttons. Depending on the `banner_type` configuration (Single, Rotate, Running), the `banner_text` field adapts its structure.

## `IBannerTemplate` Fields

* **`template`** (`number`): Must be `0` (`BannerTemplateType.ANNOUNCEMENT`).
* **`banner_text`** (`string | string[] | MediaAnnouncement[]`): The primary content of the banner. 
  * *Single Banner*: `string`
  * *Rotate Banner*: `string[]`
  * *Running Banner*: `string[] | MediaAnnouncement[]` (An array of media blocks for marquee-style running banners, containing `type`, `content`, `size`, `image_url_cdn`, etc.)
* **`act_type`** (`number`): The type of action element displayed. 
  * *Allowed Values*: Typically `0` (None), `1` (Text Link), `2` (Button), `3` (Block-level CTA).
* **`act_text`** (`string`): The text label displayed inside the call-to-action button or link (e.g., "Shop Now").
* **`clickable`** (`boolean`): If `true`, the entire banner area becomes a clickable hyperlink.
* **`redirect_url`** (`string`, optional): The destination URL if `clickable` is `true` or if an action button is pressed.
* **`content_order`** (`string`, optional): A comma-separated string dictating the layout order of internal elements.
  * *Allowed Values*: Combinations like `'text,action'`, `'action,text'`, `'text,coupon'`, etc.
* **`btn_settings`** (`BannerBtnSetting`, optional): A detailed configuration object for the button.
  * *Properties*: Includes `target_blank` (boolean), `url` (string), `btn_style` (string), `btn_color` (hex string), `btn_txt_color` (hex string), `padding` (string), `animation` (enum number).
* **`enable_coupon`** (`boolean`): From `ActionSchemaWithCoupon`, enables the coupon block.
* **`coupon_code`** (`string`): The coupon code to copy.
* **`animation_type`** (`number`): The animation type (specifically for Rotate and Running banners).
* **`animation_duration`** (`string`): Duration of the animation (specifically for Rotate and Running banners).
* **`animation_hover_pause`** (`boolean`): Pauses animation on hover (specifically for Rotate and Running banners).

## Shared Base Styling Fields
These fields apply to the aesthetic configuration (`CoreBannerTemplateSchema`):
* **`bg_type`** (`number`): Background rendering mode. `0` (Solid Color), `1` (Gradient), `2` (Image).
* **`bg_color`** (`string`): Hex color code.
* **`bg_opacity`** (`number`): Opacity percentage (`0` to `100`).
* **`bg_gradient`** (`string`): JSON string of gradient colors `{"color1":"#fff","color2":"#000"}`.
* **`font_family`** (`string`): The font family.
* **`font_color`** (`string`): Base text color in hex.
* **`font_size_button`** (`number`): Base text size in pixels for buttons.
* **`border_width`**, **`border_radius`**, **`border_color`**, **`border_style`**: Standard CSS-like border properties.
* **`bg_padding`**, **`bg_padding_bottom`**, **`bg_padding_left`**, **`bg_padding_right`** (`number`): Spacing around the banner.

## `IBannerConfig` Fields
* **`banner_type`** (`0 | 1 | 2`): Layout style (`0`: Single static, `1`: Rotating marquee, `2`: Running marquee).
* Standard display scheduling and targeting settings apply (see base config).
