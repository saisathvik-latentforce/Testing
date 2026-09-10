## Purpose

Lets customers narrow the visible coffee catalog to one or more vendors, so they can shop by roaster they trust.

## ADDED Requirements

### Requirement: Catalog can be filtered by vendor
The catalog view SHALL let the customer select zero or more vendors and show only products from the selected vendors.

#### Scenario: No vendor filter selected
- **WHEN** the customer has not selected any vendor filter
- **THEN** all catalog products are shown, regardless of vendor

#### Scenario: One vendor selected
- **WHEN** the customer selects a single vendor from the filter
- **THEN** only products whose vendor matches the selected vendor are shown

#### Scenario: Multiple vendors selected
- **WHEN** the customer selects more than one vendor from the filter
- **THEN** only products whose vendor matches any of the selected vendors are shown

#### Scenario: Newly added product respects active filter
- **WHEN** a new coffee is added with a vendor that is not part of the current filter selection
- **THEN** the new product does not appear in the filtered view until its vendor is selected or the filter is cleared

### Requirement: Vendor filter options reflect the catalog
The set of vendors offered in the filter SHALL be derived from the vendors present in the current catalog.

#### Scenario: Filter options update as vendors are added
- **WHEN** a coffee with a vendor not previously in the catalog is added
- **THEN** that vendor becomes available as a filter option
