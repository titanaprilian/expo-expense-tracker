# Troubleshooting Guide: Fixing Date Picker Visibility

## Issue
When clicking the date selection button, the button flashes (indicating a press) but the date picker modal does not appear.

## Step-by-Step Fix Instructions

### 1. Verify State Management
Ensure you have a boolean state to control the visibility of the picker.
- **Check**: Is `setShowPicker(true)` being called in the button's `onPress`?
- **Check**: Is the picker component only rendered conditionally (e.g., `{showPicker && <DateTimePicker ... />}`)?

### 2. Platform-Specific Behavior (Android vs. iOS)
If you are using `@react-native-community/datetimepicker`:
- **Android**: The picker is a separate modal. When the user selects a date or cancels, you **must** set the `showPicker` state back to `false` in the `onChange` callback. If you don't, the component might "think" it's already open and won't show again on the next click.
- **iOS**: The picker can be `inline`, `spinner`, or `compact`. If using `inline`, it doesn't need a modal but should be placed correctly in the view hierarchy.

### 3. Proper Placement in the Component Tree
- Ensure the `<DateTimePicker>` component is NOT nested inside a restricted view (like one with `overflow: 'hidden'`).
- Try placing the picker component at the very bottom of your screen's main `<View>`, just before the closing tag.

### 4. Correct Event Handling
Your `onChange` function should handle both the "set" and "dismissed" actions:
```javascript
const onChange = (event, selectedDate) => {
  // 1. Immediately hide the picker (especially important for Android)
  setShowPicker(false);
  
  if (selectedDate) {
    // 2. Update your date state
    setDate(selectedDate);
  }
};
```

### 6. Special Case: Invisible Picker inside a Modal
If the Modal shows up (you see the "Done" button) but the picker is missing:
- **Change Display Mode**: Remove `display="spinner"` and use `display="default"`. Spinner mode often requires very specific parent container heights to be visible.
- **Background Color**: On some versions of Android/iOS, if the theme is dark but the picker doesn't detect it, it might render white text on a white background. Try setting an explicit `textColor` prop if available, or check if the parent `View` background is conflicting.
- **Direct Rendering**: On Android, try rendering the `<DateTimePicker>` *outside* of the `<Modal>` component. The library's `default` mode on Android creates its own native modal, and nesting it inside a React Native `<Modal>` can cause z-index or visibility issues.
