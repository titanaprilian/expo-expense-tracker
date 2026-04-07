# Issue: Enhance App Interactivity with Animations and Visual Feedback

## Overview
The current application feels static. To make the app feel "alive" and polished, we need to implement meaningful animations and transitions throughout the user interface.

## Goals
- Add visual feedback (scale, opacity, or color shifts) when users interact with buttons and category chips.
- Implement entry/exit animations for list items and screen transitions.
- Ensure the app feels responsive and "bouncy" rather than rigid.

## Technical Guidance
- **Tooling**: Use **Tailwind CSS (via NativeWind)** for styling-based transitions.
- **Library**: Leverage `react-native-reanimated` (already in `package.json`) for complex gestures or layout animations.
- **Scope**:
    - Button presses (Add Expense, Save).
    - Category selection feedback.
    - FlatList item entry animations on the Home screen.
    - Smooth transitions between the Home and Add Expense screens.

## Note for Developer
Focus on "micro-interactions." The goal is not to have distracting animations, but to provide the user with clear, fluid feedback for every action they take. You have the creative freedom to choose the specific animation curves and durations that best fit the brand.
