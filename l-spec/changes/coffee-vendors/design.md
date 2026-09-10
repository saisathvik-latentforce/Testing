## Context

The catalog is a static, client-side array (`src/assets/coffee.js`) rendered by `Coffee.js`, with no backend. `AddCoffeeDialog.js` builds a new product object and calls `onAdd`, which `Coffee.js` appends to local state. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Attach a vendor name to every product, present and future.
- Let the customer filter the grid by one or more vendors.
- Let the user adding a coffee pick an existing vendor or type a new one.

**Non-Goals:**
- No vendor entity beyond a name (no logo, location, or profile page) — matches the "Name + filter chip" scope decision.
- No persistence beyond the current in-memory session; vendors added via the dialog behave like the rest of the catalog (lost on reload), consistent with existing `handleAddCoffee` behavior.
- No changes to `CartContext`, `Payment.js`, or order flow.

## Decisions

- **Vendor list derivation**: The set of known vendors is derived at render time from the current `products` array (`[...new Set(products.map(p => p.vendor))]`), not stored separately. Alternative considered: a separate `vendors` state array — rejected because it would need to stay in sync with `products` and offers no benefit here since vendors have no attributes beyond their name.
- **Vendor matching**: Vendor names are compared case-sensitively as entered. Alternative considered: case-insensitive normalization — rejected as unnecessary complexity for a name-only field; the autocomplete already reduces the chance of near-duplicate entries by surfacing existing names.
- **Vendor input widget**: Use MUI `Autocomplete` with `freeSolo` in `AddCoffeeDialog.js`, options = current vendor list. This gives "pick existing or type new" for free without a custom dropdown. Submission is blocked (existing `disabled` pattern on the Add button) when the trimmed vendor value is empty.
- **Filter widget**: A row of selectable `Chip` components above the grid in `Coffee.js`, one per known vendor, toggled on click (multi-select, `activeVendorFilters` as a `Set`/array in local state). Alternative considered: MUI `Select multiple` — rejected in favor of chips since the proposal explicitly calls for a "chip-based multi-select" and chips are cheaper to scan visually for a short vendor list.
- **Filtering logic**: When `activeVendorFilters` is empty, show all products (per spec's "no filter selected" scenario); otherwise show products whose `vendor` is in the selected set. This filter composes with existing `loading` skeleton state — filtering only applies to the loaded `products` list, not skeleton placeholders.
- **Card display**: Vendor renders as a `Chip` on the card, next to the existing "Active/Out of Stock" chip and rating, reusing the existing `Stack` row rather than adding new layout structure.

## Risks / Trade-offs

- [Vendor is a free-text field, so near-duplicate vendor names (e.g. "Blue Bottle" vs "Blue Bottle Coffee") can fragment the filter] → Mitigated by the autocomplete surfacing existing names first; no further dedup logic is in scope.
- [Adding a filter row changes the catalog's vertical layout] → Low risk; it's an additive UI element above the existing grid, no restructuring of existing components.
