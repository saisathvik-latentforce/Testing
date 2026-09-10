## 1. Catalog data

- [x] 1.1 Add a `vendor` field to every product in `src/assets/coffee.js` and verify each of the 6 existing products has a non-empty vendor name.

## 2. Vendor attribution on product cards

- [x] 2.1 Render a `Chip` for `product.vendor` on each card in `Coffee.js`, alongside the existing status chip/rating, and verify every rendered card shows its vendor.

## 3. Vendor filter on the catalog

- [x] 3.1 Derive the distinct vendor list from `products` in `Coffee.js` and render it as a row of toggleable `Chip`s above the grid, and verify the row shows one chip per distinct vendor with no duplicates.
- [x] 3.2 Add `activeVendorFilters` state and filter the rendered (non-skeleton) product list so it shows all products when no filter is selected, and only matching products when one or more vendors are selected; verify by toggling chips and checking the grid updates.
- [x] 3.3 Verify a newly added coffee's vendor is reflected in the filter chip row and that the filter continues to behave correctly with the new vendor included.

## 4. Vendor input on Add Coffee dialog

- [x] 4.1 Add a vendor `Autocomplete` (`freeSolo`) field to `AddCoffeeDialog.js`, sourced from the current vendor list passed in as a prop, and verify selecting an existing vendor populates the field.
- [x] 4.2 Include the entered vendor value in the object passed to `onAdd`, and require a non-empty (trimmed) vendor before the Add button is enabled, matching the existing `disabled={!title || !price}` pattern; verify the button stays disabled until title, price, and vendor are all filled.
- [x] 4.3 Wire the vendor list from `Coffee.js` into `AddCoffeeDialog` and verify a newly typed vendor name shows up as a selectable option the next time the dialog opens.

## 5. Tests

- [x] 5.1 Update or add tests under `src/components/__tests__/` covering: product card shows vendor, filter narrows results for one and multiple selected vendors, clearing filters shows all products, and `AddCoffeeDialog` blocks submission without a vendor and passes the vendor through `onAdd`. Verify with `npm test`.
