# Issue: Implement Delete Expense Feature

## Overview
Users need a way to remove expenses they no longer want to track. A delete action should be available during the editing process.

## Goals
- **UI**: Add a "Delete" button to the Edit Expense screen.
- **Confirmation**: Show an alert to confirm the deletion before proceeding.
- **State Update**: Remove the record from the global store and ensure the "Total Spending" on the Home screen is updated immediately.
- **Navigation**: Return to the Home screen after a successful deletion.
- **Persistence**: Ensure the record is permanently removed from local storage (`AsyncStorage`).

## Technical Guidance
- **Store**: Add a `deleteExpense` function to `useExpenseStore`.
- **Logic**: Use the unique `id` of the expense to filter it out of the current list.

## Note for Developer
The delete button should be visually distinct (e.g., using an "error" or red color) to prevent accidental clicks. Ensure the user is prompted for confirmation to avoid data loss.
