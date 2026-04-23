# Core Banner Configuration

This document defines the shared base model used by all banner types.

## Purpose

Use this file as the source of truth for:

- Core inheritance model (config vs template)
- Shared fields allowed across banner types
- Common validation and generation rules

For template-specific fields, see files in `docs/specific/`.

## Architecture Model

Banner data has two layers:

1. Config layer (`CoreBannerSchema` / `IBannerConfig`)
- Controls where, when, and to whom a banner appears.
- Extended by wrapper types such as Single, Rotate, Running, Multi.

2. Template layer (`CoreBannerTemplateSchema` / `IBannerTemplate`)
- Controls visuals and per-template content.
- Stored in `banner_templates`.
- Extended by specific template schemas (Announcement, Countdown, Email Signup, etc.).

In short:

- `IBannerConfig` is the wrapper-level behavior.
- `IBannerTemplate` is the visual/content block.
- Specific banner types inherit both base layers and add only their own fields.

## Minimal Structure

```json
{
  "name": "Summer Sale Banner",
  "banner_type": 0,
  "enable": true,
  "position": 1,
  "pages": ["home", "product"],
  "banner_templates": [
    {
      "template": 0,
      "bg_type": 0,
      "bg_color": "#ff0000",
      "font_family": "Arial",
      "banner_text": "Sale ends tonight",
      "act_type": 2,
      "act_text": "Shop now"
    }
  ]
}
```

## Core Template Fields (`CoreBannerTemplateSchema` / `IBannerTemplate`)

### Background

- `bg_type` (`number`): `0` solid, `1` gradient, `2` image.
- `bg_color` (`string`): Hex color used for solid background.
- `bg_opacity` (`number`): Opacity from `0` to `100`.
- `bg_gradient` (`string`): JSON string gradient payload, for example `{"color1":"#fff","color2":"#000"}`.
- `bg_preset` (`number`, optional): Preset background ID.
- `bg_img_url_cdn` (`string`, optional): CDN image URL.
- `bg_img_url_s3` (`string`, optional): S3 image URL.
- `bg_img_path_name` (`string`, optional): Stored image path.
- `bg_size` (`string`, optional): CSS-like value such as `cover` or `contain`.

### Typography

- `font_family` (`string`): Font family name.
- `font_url` (`string`, optional): Font URL.
- `font_url_cdn` (`string`, optional): CDN font URL.
- `font_color` (`string`, optional): Base text color in hex.
- `font_scale_enabled` (`boolean`): Enable global font scaling.
- `font_scale` (`number`): Font scale multiplier.
- `font_size_button` (`number`): Base button font size in px.

### Spacing And Borders

- `bg_padding` (`number`): Base padding.
- `bg_padding_bottom` (`number`): Bottom padding.
- `bg_padding_left` (`number`): Left padding.
- `bg_padding_right` (`number`): Right padding.
- `mobile_padding_enabled` (`boolean`): Enable mobile-specific padding.
- `mb_bg_padding` (`string`): Mobile padding shorthand, for example `10px 15px`.
- `border_width` (`string`): CSS-like border width, for example `1px 1px 1px 1px`.
- `border_radius` (`string`): CSS-like border radius.
- `border_color` (`string`): Border color in hex.
- `border_style` (`number`): Style enum (solid, dashed, etc.).

### Behavior

- `clickable` (`boolean`): Entire banner is clickable when enabled.
- `redirect_url` (`string`, optional): Target URL for click actions.
- `auto_apply_discount` (`boolean`): Auto-apply discount on click.
- `cta_popup_config` (`object`, optional): Popup trigger config (`popup_id`, `popup_type`, `delay_time`).
- `button_styles` (`record`, optional): Button style overrides.
- `btn_settings` (`record`, optional): Additional CTA button settings.

## Core Config Fields (`CoreBannerSchema` / `IBannerConfig`)

### General

- `id` (`number`, optional): Banner ID.
- `name` (`string`): Banner internal name.
- `banner_type` (`number`): `0` single, `1` rotate, `2` running, `3` multi.
- `enable` (`boolean`): Publish status.
- `position` (`number`): Placement position.
- `priority` (`number`, optional): Priority when conflicts happen.
- `close_button` (`boolean`): Show close icon.
- `btn_close_color` (`string`): Close icon color.
- `custom_css` (`string`, optional): Custom CSS for wrapper.

### Page And Device Targeting

- `pages` (`string[]`): Included page groups, for example `all`, `home`, `product`, `cart`.
- `enable_excl_pages` (`boolean`): Enable exclusions.
- `excl_pages` (`string`, optional): Comma-separated excluded paths.
- `specific_pages` (`string`, optional): Comma-separated allowlist paths.
- `show_device` (`string`): `all`, `desktop`, or `mobile`.

### Customer And Geo Targeting

- `customer_type` (`number`): Login targeting mode.
- `customer_ids` (`string[]`, optional): Included customer IDs.
- `customer_tags` (`string[]`, optional): Included customer tags.
- `excl_customer_type` (`number`, optional): Excluded login mode.
- `excl_customer_ids` (`string[]`, optional): Excluded customer IDs.
- `excl_customer_tags` (`string[]`, optional): Excluded customer tags.
- `enable_allowed_countries` (`boolean`): Enable allowed-country targeting.
- `country_type` (`number`): Country matching mode.
- `countries` (`string[]`): Allowed country codes, for example `US`, `GB`.
- `exclude_countries` (`record`, optional): Excluded country map.
- `enable_language` (`boolean`): Enable language targeting.
- `allowed_languages` (`string[]`): Allowed locale codes.

### Product And Cart Targeting

- `product_type` (`number`): Product targeting mode.
- `collections` (`string[]`, optional): Included collections.
- `product_ids` (`string[]`, optional): Included products.
- `tags` (`string[]`, optional): Included product tags.
- `excl_product_type` (`number`, optional): Excluded product targeting mode.
- `excl_product_ids` (`string[]`, optional): Excluded products.
- `excl_tags` (`string[]`, optional): Excluded tags.
- `excl_product_collections` (`string[]`, optional): Excluded collections.
- `collection_type` (`number`, optional): Collection-page targeting mode.
- `collection_ids` (`string[]`, optional): Included collection IDs.
- `trigger_settings` (`object`, optional): Advanced trigger config such as cart amount, operator, ATC tags.

### Scheduling And Frequency

- `enable_visibility_date` (`boolean`): Enable start date.
- `enable_to_date` (`boolean`): Enable end date.
- `from_date` (`string`, optional): ISO start datetime.
- `to_date` (`string`, optional): ISO end datetime.
- `enable_fixed_time` (`boolean`): Enable recurring schedule.
- `fixed_time` (`record`, optional): Recurring schedule payload.
- `delay_type` (`number`): `0` immediate, `1` delay, `2` scroll depth.
- `delay_time` (`number`): Trigger value for delay type.
- `show_again_type` (`number`): Re-show strategy.
- `show_again_time` (`number`): Re-show interval value.