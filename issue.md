# Issue: Fix Invisible Date Picker

## Overview
The current implementation of the date picker shows the modal container and the header (Cancel/Done buttons), but the actual calendar or spinner is invisible to the user.

## The Problem
Using `display="spinner"` inside a `Modal` often leads to layout issues where the picker has zero height or is rendered outside the visible area, especially when specific `style` properties are missing or conflicting with the modal's container.

## Goals
- **Fix Visibility**: Ensure the date picker is fully visible when the modal opens.
- **Platform Defaults**: Change the picker to use the system default display mode (`default`) for better reliability.
- **Layout**: Ensure the picker occupies the correct space within the modal.

## Technical Guidance
- **Display Mode**: Change `display="spinner"` to `display="default"` (or remove the prop to use the default).
- **Styling**: On iOS, if you must use `spinner`, ensure the `DateTimePicker` has an explicit `width` and `height` that fits within the parent `View`.
- **Simplification**: Consider if a `Modal` is strictly necessary on Android, as the library already provides a native modal dialog for that platform.

## Note for Developer
Test this on both iOS and Android if possible. The `default` display mode is generally the most robust and matches user expectations for each platform.
