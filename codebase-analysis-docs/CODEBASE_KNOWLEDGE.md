# Codebase Knowledge Document - Expo Expense Tracker

## STATE BLOCK
- **INDEX_VERSION**: 1.2.0
- **FILE_MAP_SUMMARY**: Complete mapping of App entry, Zustand store, Screens (Home, Add), Hooks (Store, AddExpense, Total), and Utils (Currency).
- **OPEN_QUESTIONS**: None.
- **KNOWN_RISKS**: AsyncStorage scalability with large datasets; JSON serialization overhead on each write.
- **GLOSSARY_DELTA**: Hydration, NativeWind, AsyncStorage, Zustand.

---

## 0. FILE INDEX (Pass 0)
| PRIORITY | PATH | TYPE | LINES | NOTES |
| :--- | :--- | :--- | :--- | :--- |
| +++ | `App.tsx` | Entry | ~25 | Hydration & Theme Provider |
| +++ | `src/features/expense/hooks/useExpenseStore.ts` | State | ~35 | Zustand store & Persistence |
| ++ | `src/screens/HomeScreen.tsx` | Screen | ~65 | Dashboard & List |
| ++ | `src/screens/AddExpenseScreen.tsx` | Screen | ~85 | Entry Form |
| ++ | `src/features/expense/hooks/useAddExpense.ts` | Hook | ~65 | Form logic & Validations |
| + | `src/utils/currency.ts` | Utils | ~15 | IDR Formatting |
| + | `src/navigation/AppNavigator.tsx` | Nav | ~35 | Navigation Stack |
| + | `global.css` | Style | ~50 | Tailwind/NativeWind theme |

---

## 1. High-Level Overview (PHASE 1)

### Purpose & Domain
The **Expo Expense Tracker** is a mobile application for personal finance management. It allows users to record daily expenses, categorize them, and track total spending in Indonesian Rupiah (IDR).

### Main Features
- **Dashboard**: High-level view of total spending and recent history.
- **Expense Logging**: Form-based entry for amount, category, and notes.
- **Local Persistence**: Data survives app restarts via local storage.
- **Theme Support**: Adaptive UI for light and dark system preferences.

### Business Purpose of Features
| Feature | User Value |
| :--- | :--- |
| **Total Spending** | Immediate financial awareness. |
| **Categorization** | Insight into spending habits (Food, Bills, etc.). |
| **Persistence** | Data reliability and long-term tracking. |
| **Currency Formatting** | Localized experience for the IDR market. |

---

## 2. System Architecture (PHASE 2)

### Architecture Type
**Feature-Based Architecture**. Logic related to "expenses" is grouped in `src/features/expense/`.

### Component Map
- **Root (`App.tsx`)**: Handles store hydration and theme wrapping.
- **Navigation (`src/navigation/`)**: Uses `@react-navigation/native-stack` for `Home` and `AddExpense` routes.
- **State (`src/features/expense/hooks/useExpenseStore.ts`)**: Central Zustand store managing the expense list.
- **UI (`src/screens/`)**: React components using NativeWind for styling.
- **Utilities (`src/utils/`)**: Shared pure functions for currency logic.

### Data Flow
1. **User Action**: Data entered in `AddExpenseScreen`.
2. **Logic Processing**: `useAddExpense` validates and parses input.
3. **State Update**: `addExpense` updates the Zustand store.
4. **Persistence**: Store automatically saves the updated list to `AsyncStorage`.
5. **Reactivity**: `HomeScreen` re-renders the list and total from the updated store.

---

## 3. Feature-by-Feature Analysis (PHASE 3)

### Expense Management
- **Entry Points**: `AddExpenseScreen` via navigation from `Home`.
- **Hooks**: `useAddExpense` manages local form state and interaction with the store.
- **Logic**: Validates that amount and category are present before saving.

### Financial Summary
- **Logic**: `useTotalSpending` performs a `reduce` operation on the `expenses` array.
- **UI**: Displayed as a prominent card on the `HomeScreen`.

### Local Persistence
- **Implementation**: Zustand's `hydrate` method is triggered on app launch.
- **Storage**: Data is stored as a JSON string under the key `'expenses'`.

---

## 4. Nuances, Subtleties & Gotchas (PHASE 4)

### Currency Handling
- The app uses real-time formatting in the input field. The `parseRupiah` utility is critical for converting formatted strings (e.g., "1.000") back to numbers (1000) for storage.
- **Gotcha**: Always store raw numbers; only format for the UI layer.

### State Scaling
- The current implementation serializes the **entire** expense array on every update.
- **Optimization**: For very large datasets, this could cause UI jank. If the app expands, consider a more granular storage solution.

---

## 5. Technical Reference & Glossary (PHASE 5)

### Glossary
- **Hydration**: Loading stored data into app memory.
- **NativeWind**: Tailwind CSS for React Native.
- **Zustand**: Minimalist state management.
- **AsyncStorage**: Key-value local storage.

### Data Schema
```json
{
  "id": "string",
  "amount": "number",
  "category": "string",
  "note": "string",
  "date": "ISO8601 string"
}
```

---

## 6. Future Considerations
- **Dynamic Categories**: Move categories from hardcoded constants to a user-editable list.
- **Filtering**: Add date-range or category-based filtering on the dashboard.
- **Exporting**: Implement CSV export for external reporting.

---

## Appendix: Assets
- **Diagram**: `codebase-analysis-docs/assets/architecture.mermaid`
- **Build Config**: `metro.config.js` integrates NativeWind with the Expo build process.
