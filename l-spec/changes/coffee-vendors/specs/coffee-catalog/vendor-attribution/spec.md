## Purpose

Attributes every coffee product to a vendor, so the catalog reflects who supplies each item and new products can be assigned an existing or newly-named vendor.

## ADDED Requirements

### Requirement: Coffee products carry a vendor
Every coffee product in the catalog SHALL have a non-empty vendor name associated with it.

#### Scenario: Existing catalog items have a vendor
- **WHEN** the catalog is loaded
- **THEN** every product in the catalog has a non-empty vendor name

#### Scenario: Product card displays its vendor
- **WHEN** a product card is rendered
- **THEN** the product's vendor name is visible on the card

### Requirement: New coffee can be assigned a vendor
When adding a new coffee product, the user SHALL be able to select an existing vendor or provide a new vendor name.

#### Scenario: Selecting an existing vendor
- **WHEN** the user opens the vendor input while adding a coffee
- **THEN** the input offers the list of vendors already present in the catalog

#### Scenario: Adding a coffee with a new vendor name
- **WHEN** the user types a vendor name that does not match any existing vendor and submits the new coffee
- **THEN** the new coffee is added to the catalog with that vendor name

#### Scenario: Vendor is required to add a coffee
- **WHEN** the user attempts to submit the add-coffee form without specifying a vendor
- **THEN** the submission is blocked until a vendor name is provided
