## Why

The coffee catalog currently has no notion of who supplies a given coffee. Customers can't tell which roaster/vendor a product comes from, and there's no way to browse the menu by vendor. Adding vendor attribution makes the catalog feel like a real multi-vendor marketplace and gives customers a way to shop by roaster they trust.

## What Changes

- Each coffee product gains a `vendor` field (a vendor name string).
- Existing catalog items (`src/assets/coffee.js`) are seeded with vendor names.
- Product cards in the catalog display the vendor as a chip.
- The catalog view gains a vendor filter (chip-based multi-select) so customers can narrow the grid to one or more vendors.
- `AddCoffeeDialog` gains a vendor input: an autocomplete populated from the current set of known vendors, with the ability to type a new vendor name inline ("add new").

## Capabilities

### New Capabilities
- `coffee-catalog/vendor-attribution`: Coffee products carry a vendor name, shown on product cards and selectable/creatable when adding a new coffee.
- `coffee-catalog/vendor-filtering`: Customers can filter the visible catalog to one or more vendors.

### Modified Capabilities
(none — no existing specs predate this change)

## Impact

- `src/assets/coffee.js`: add `vendor` field to each existing product.
- `src/components/Coffee.js`: render vendor chip per card, add vendor filter UI, filter the rendered product list.
- `src/components/AddCoffeeDialog.js`: add vendor autocomplete input, include `vendor` in the object passed to `onAdd`.
- No backend/API involved — this is a client-side, in-memory catalog (consistent with current architecture).
