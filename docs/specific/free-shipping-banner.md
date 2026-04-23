# Free Shipping Banner Configuration

The Free Shipping Banner (`template: 3`) is a dynamic banner that calculates the remaining amount a user needs to spend to unlock free shipping based on their cart.

## Specific Fields in `IBannerTemplate` (`FreeShippingBannerTemplateSchema`)

* **`template`** (`number`): Must be `3` (`BannerTemplateType.FREE_SHIPPING`).
* **`banner_text`** (`FreeShippingText`): Object containing messages for different cart states.
  * *Properties*: 
    * `start_msg` (`string`): Shown when cart is empty (e.g., "Spend {{free_shipping_goal}} for FREE shipping!").
    * `progress_msg` (`string`): Shown when cart has items but hasn't reached the goal (e.g., "You are {{remaining_amount}} away from FREE shipping!").
    * `goal_reached_msg` (`string`): Shown when cart value >= goal (e.g., "Congratulations! You've unlocked FREE shipping!").
  * *Supported Variables*: `{{free_shipping_goal}}`, `{{remaining_amount}}`, `{{currency_symbol}}`, `{{market}}`.
* **`free_shipping_goal`** (`FreeShippingGoal`, optional/nullable): An object mapping country codes to goal amounts.
  * *Structure*: `{ "US": 50, "default": 100 }`.

## Action Fields (`ActionSchema`)

*Note: The Free Shipping banner does not inherit the `ActionSchemaWithCoupon` schema, it only inherits the standard `ActionSchema`.*

* **`act_type`** (`number`): Action type (e.g., 0=None, 1=Link, 2=Button).
* **`act_text`** (`string`): CTA Button label (e.g., "View Cart" or "Keep Shopping").
* **`btn_style`** (`number`): Style index.
* **`act_content_color`** (`string`): Background color of the CTA button.
* **`btn_text_color`** (`string`): Text color of the CTA button.
* **`btn_copy`** (`object`): 
  * `text_copy` (`string`): Label for copying.
  * `success_mess` (`string`): Success label.
* **`content_gap`** (`number`): Spacing between components.
* **`content_order`** (`string`, optional): Display order (e.g., 'text,action').

## Shared Core Template Fields (`CoreBannerTemplateSchema`)

Inherits typical visual options:
* **`bg_type`**, **`bg_color`**, **`bg_opacity`**, **`bg_gradient`**
* **`font_family`**, **`font_color`**, **`font_size_button`**
* **`border_width`**, **`border_radius`**, **`border_color`**, **`border_style`**
* **`bg_padding`**, **`mobile_padding_enabled`**, etc.
* **`clickable`** (`boolean`), **`redirect_url`** (`string`, optional)

## `IBannerConfig` Fields (`FreeShippingBannerSchema`)

* Uses the standard `CoreBannerSchema` config. All scheduling, geographical, and page targeting rules apply identically.