# Issue: Redesign "Add Expense" Button to Floating Action Button (FAB)

## Overview
The current "Add Expense" button is a full-width button located below the dashboard, which takes up significant vertical space. We want to move to a more modern "Floating Action Button" (FAB) pattern.

## Goals
- **UI Change**: Replace the existing full-width "Add Expense" button with a circular button.
- **Positioning**: The new button should be fixed to the bottom right corner of the Home screen.
- **Iconography**: Use a "+" (plus) icon inside the circular button.
- **Visuals**: Ensure the button has a distinct background color (e.g., the primary theme color) and a subtle shadow to make it appear "floating."

## Technical Guidance
- **Styling**: Use **NativeWind** (Tailwind CSS) for positioning (`absolute`, `bottom-8`, `right-8`).
- **Icons**: Use `Ionicons` (already used in the project) for the plus icon.
- **Component**: Ensure the button remains accessible and has a proper hit area.

## Note for Developer
The button should stay in place even when the expense list is scrolled. Think about the z-index and how it interacts with the list items behind it. Feel free to add a slight elevation or shadow to make it pop.
