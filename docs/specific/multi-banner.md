# Multi Banner Configuration

The Multi Banner (`template: 5`) is a parent structure that acts as a slider or carousel to hold multiple other banner templates or slides.

## Specific Fields in `IBannerTemplate` (`MultiBannerTemplateSchema`)

* **`template`** (`number`): Must be `5` (`BannerTemplateType.MULTI_BANNER`).
* **`banner_text`** (`string`): General descriptive text for the slide.
* **`slide_config`** (`SlideBannerConfig`, optional/nullable): Settings specific to the individual slide within the carousel.
  * *Properties*: `name` (`string`), `hidden` (`boolean`), `enable_schedule` (`boolean`), `from_date` (`string`), `to_date` (`string`). Allows individual slides to be scheduled independently.
* **`digit_style`** (`string`, optional/nullable): Formatting details.
* **`coupon_code`** (`string`): Optional inherited field from `ActionSchemaWithCoupon`.
* **`enable_coupon`** (`boolean`): Toggles a coupon code for the individual slide.

## Action & Coupon Fields (`ActionSchemaWithCoupon`)

* **`act_type`** (`number`): Action type.
* **`act_text`** (`string`): CTA Button label.
* **`btn_style`** (`number`): Style index.
* **`act_content_color`** (`string`): Hex color.
* **`btn_text_color`** (`string`): Hex color.
* **`btn_copy`** (`object`): 
  * `text_copy` (`string`): Label for copying.
  * `success_mess` (`string`): Success label.
* **`content_gap`** (`number`): Spacing.
* **`content_order`** (`string`, optional): Display order.

## Shared Core Template Fields (`CoreBannerTemplateSchema`)

Inherits typical visual options:
* **`bg_type`**, **`bg_color`**, **`bg_opacity`**, **`bg_gradient`**
* **`font_family`**, **`font_color`**, **`font_size_button`**
* **`border_width`**, **`border_radius`**, **`border_color`**, **`border_style`**
* **`bg_padding`**, **`mobile_padding_enabled`**, etc.
* **`clickable`** (`boolean`), **`redirect_url`** (`string`, optional)

## Specific Fields in `IBannerConfig` (`MultiBannerSchema`)

The Multi Banner config expands on `CoreBannerSchema` to include carousel properties.

* **`multi_config`** (`MultiBannerConfig`, optional/nullable): Global settings for the carousel behavior.
  * *Properties*:
    * `transition` (`number`): Animation type (e.g., `0` for slide, `1` for fade).
    * `duration` (`number`): Time in seconds each slide is shown.
    * `pause_on_hover` (`boolean`): Stops auto-play when user hovers over the banner.
    * `slider_order` (`number[]`): Array of template indices dictating the display order (e.g., `[1, 0, 2]`).
    * `bg_padding_*` (`number`): Wrapper paddings for the entire carousel block.
* **`font_scale_enabled`** (`boolean`, optional/nullable): Global font scale toggle.
* **`font_scale`** (`number`, optional/nullable): Global font scaling value.

All standard scheduling, geographical, and page targeting rules from `CoreBannerSchema` also apply to the parent multi-banner container.