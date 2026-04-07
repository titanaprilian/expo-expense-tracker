# Issue: Implement Edit Expense Feature

## Overview
Currently, users can only add and view expenses. We need to implement the ability to edit existing records to correct mistakes or update information.

## Goals
- **Navigation**: Clicking an expense card on the Home screen should navigate to an "Edit Expense" page.
- **Form Pre-population**: The edit form should automatically fill with the existing data (amount, category, note) for that specific expense.
- **State Synchronization**: When an expense is updated, the global state and the "Total Spending" on the Home screen must reflect the change immediately.
- **Persistence**: Ensure changes are saved to local storage (`AsyncStorage`).

## Technical Guidance
- **Store**: Update the `useExpenseStore` to include an `updateExpense` function.
- **Navigation**: Pass the `expenseId` or the full `expense` object as a parameter to the new screen.
- **UI**: You can either create a new `EditExpenseScreen.tsx` or refactor `AddExpenseScreen.tsx` to handle both "Add" and "Edit" modes.

## Note for Developer
Focus on making the transition from the list to the edit form smooth. The user should feel confident that their changes have been saved correctly when they return to the Home screen.
