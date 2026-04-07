# Issue: Manual Date Selection and Date-based Grouping

## Overview
Currently, expenses are automatically assigned the creation date, making it impossible to log past or future transactions. Additionally, the main expense list is a flat list that becomes difficult to read as it grows.

## Goals
- **Manual Date Entry**: Add a date picker or input field to both the "Add Expense" and "Edit Expense" screens.
- **Data Model**: Ensure the user-selected date is saved in the expense record.
- **Organized View**: Group the expenses on the Home screen by their date (e.g., "Today", "Yesterday", or "April 7, 2026").
- **Sorting**: Ensure expenses within each group are sorted chronologically (or reverse-chronologically).

## Technical Guidance
- **Picker**: Use a standard React Native / Expo date picker library.
- **UI Logic**: Consider switching the `FlatList` on the Home screen to a `SectionList` to handle the grouped data structure more effectively.
- **Formatting**: Use a consistent date format for the group headers.

## Note for Developer
The goal is to give users more control over their financial history. The grouping should make the dashboard feel organized and easy to scan. Think about how to handle empty states or very long lists within a single date group.
