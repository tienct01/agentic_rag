# Countdown Banner Configuration

The Countdown Banner (`template: 1`) is used to create urgency by displaying a countdown timer alongside text.

## Specific Fields in `IBannerTemplate` (`CountdownBannerTemplateSchema`)

* **`template`** (`number`): Must be `1` (`BannerTemplateType.COUNTDOWN`).
* **`banner_text`** (`string`): The primary content of the banner next to the countdown.
* **`countdown_type`** (`number`): Determines how the countdown behaves.
  * *Allowed Values*: Depends on `CountdownType` enum (e.g., Specific Date/Time, Daily recurring, Fixed Interval, Evergreen session-based).
* **`countdown_start_time`** (`string`): ISO Date string for when the timer begins (for specific/interval types).
* **`countdown_end_time`** (`string`): ISO Date string for when the timer expires.
* **`act_timer_end`** (`number`): Action to take when the timer ends (e.g., hide the banner, show text).
* **`countdown_daily`** (`string`): JSON stringified object containing `{ from_time: 'HH:mm', to_time: 'HH:mm' }` for daily repeating timers.
* **`countdown_interval`** (`CountdownIntervalType`): Object defining intervals:
  * `start_time` (`string`): ISO Date string
  * `countdown_length` (`{ days: number, hours: number, minutes: number }`): Duration of active phase
  * `break_length` (`{ days: number, hours: number, minutes: number }`): Duration of break phase
* **`countdown_evergreen`** (`CountdownEvergreenType`, optional/nullable): Object defining time allocated per user session:
  * Structure: `{ days: number, hours: number, minutes: number }`
* **`countdown_format`** (`string`): Determines which time units are displayed.
  * *Allowed Values*: Keys from `CountdownFormatOpts` (e.g., `DAY_HOUR_MINUTE_SECOND`, `HOUR_MINUTE_SECOND`).
* **`timer_color`** (`string`): JSON stringified object controlling timer aesthetics (keys: `background`, `text`, `number`, `border`, `flipLine`, `accentColor`).
* **`digit_style`** (`DigitStyleTimerEnum`, optional/nullable): The visual style of the numbers.
  * *Allowed Values*: `0` (Classic), `1` (Flip), `2` (Minimalist), etc.
* **`trans_countdown`** (`string`): JSON stringified object containing localized labels for time units (e.g., `{"day":"Days","hours":"Hours"}`).
* **`font_size_countdown`** (`number`): The font size of the countdown timer digits.

## Action & Coupon Fields (`ActionSchemaWithCoupon`)

* **`act_type`** (`number`): Action type (e.g., 0=None, 1=Link, 2=Button).
* **`act_text`** (`string`): CTA Button label.
* **`enable_coupon`** (`boolean`): Toggles visibility of coupon code block.
* **`coupon_code`** (`string`): The code.
* **`btn_style`** (`number`): Style index.
* **`act_content_color`** (`string`): Hex color.
* **`btn_text_color`** (`string`): Hex color.
* **`btn_copy`** (`object`): 
  * `text_copy` (`string`): Label for copying.
  * `success_mess` (`string`): Success label.
* **`content_gap`** (`number`): Spacing between components.
* **`content_order`** (`string`, optional): Display order (e.g., 'text,countdown,action').

## Shared Core Template Fields (`CoreBannerTemplateSchema`)

Inherits typical visual options:
* **`bg_type`**, **`bg_color`**, **`bg_opacity`**, **`bg_gradient`**
* **`font_family`**, **`font_color`**, **`font_size_button`**
* **`border_width`**, **`border_radius`**, **`border_color`**, **`border_style`**
* **`bg_padding`**, **`mobile_padding_enabled`**, etc.
* **`clickable`** (`boolean`), **`redirect_url`** (`string`, optional)

## `IBannerConfig` Fields (`CountdownBannerSchema`)

* Uses the standard `CoreBannerSchema` config. All scheduling, geographical, and page targeting rules apply identically.