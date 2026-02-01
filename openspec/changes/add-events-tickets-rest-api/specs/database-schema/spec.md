## MODIFIED Requirements

### Requirement: Events table structure

The Events table SHALL store event information with fields for id, name, presenter, date, fromTime, toTime, description, ticketidprefix, and image.

#### Scenario: Events table includes image field
- **WHEN** the Events table is queried for its schema
- **THEN** the table includes an image column of type TEXT that allows NULL values

#### Scenario: Image field is optional
- **WHEN** a new event is inserted without specifying an image value
- **THEN** the event is created successfully with the image field set to NULL

#### Scenario: Image field stores relative paths
- **WHEN** an event has an associated image
- **THEN** the image field contains a relative path string (e.g., "uploads/events/1-1234567890.jpg")

#### Scenario: Existing events remain valid
- **WHEN** the image field is added to the Events table
- **THEN** all existing event records remain valid with NULL image values

### Requirement: Database migration for image field

The system SHALL provide a database migration to add the image field to the Events table.

#### Scenario: Add image column
- **WHEN** the database migration is executed
- **THEN** the system adds an image column of type TEXT with NULL constraint to the Events table

#### Scenario: Migration is idempotent
- **WHEN** the database migration is run multiple times
- **THEN** the system handles the operation gracefully without errors

#### Scenario: Preserve existing data
- **WHEN** the database migration adds the image column
- **THEN** all existing event records retain their original data unchanged
