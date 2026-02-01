## ADDED Requirements

### Requirement: Database file creation

The system SHALL create the SQLite database file (Ticketer.db.sqlite) at the project root if it does not exist.

#### Scenario: Database file created on first run
- **WHEN** the database initialization script is executed and the database file does not exist
- **THEN** a new SQLite database file SHALL be created at the project root
- **AND** the file SHALL be named Ticketer.db.sqlite

#### Scenario: Existing database file preserved
- **WHEN** the database initialization script is executed and the database file already exists
- **THEN** the existing database file SHALL not be overwritten
- **AND** the initialization SHALL proceed with the existing database

### Requirement: Events table schema

The database SHALL contain an Events table with appropriate columns for storing event information.

#### Scenario: Events table created
- **WHEN** the database initialization script is executed
- **THEN** an Events table SHALL be created if it does not exist
- **AND** the table SHALL include columns for id (not null), name (not null), presenter (not null), date (not null), fromTime (not null), toTime (not null), ticketid_prefix (not null) and description (not null)

#### Scenario: Events table already exists
- **WHEN** the Events table already exists in the database
- **THEN** the initialization script SHALL not modify the existing table
- **AND** no error SHALL be thrown

### Requirement: TicketTypes table schema

The database SHALL contain a TicketTypes table with appropriate columns for storing ticket type information.

#### Scenario: TicketTypes table created
- **WHEN** the database initialization script is executed
- **THEN** a TicketTypes table SHALL be created if it does not exist
- **AND** the table SHALL include columns for id, event_id (foreign key to Events), type_name (any of Student, Adult, Retiree), price, and max_quantity, sold_quantity

#### Scenario: TicketTypes table already exists
- **WHEN** the TicketTypes table already exists in the database
- **THEN** the initialization script SHALL not modify the existing table
- **AND** no error SHALL be thrown

### Requirement: SoldTickets table schema

The database SHALL contain a SoldTickets table with appropriate columns for storing sold ticket records.

#### Scenario: SoldTickets table created
- **WHEN** the database initialization script is executed
- **THEN** a SoldTickets table SHALL be created if it does not exist
- **AND** the table SHALL include columns for id, ticket_type_id (foreign key to TicketTypes), purchase_date, and used_date

#### Scenario: SoldTickets table already exists
- **WHEN** the SoldTickets table already exists in the database
- **THEN** the initialization script SHALL not modify the existing table
- **AND** no error SHALL be thrown

### Requirement: Idempotent initialization

The database initialization script SHALL be idempotent and safe to run multiple times.

#### Scenario: Multiple executions do not cause errors
- **WHEN** the initialization script is executed multiple times
- **THEN** no errors SHALL occur
- **AND** the database schema SHALL remain consistent
- **AND** existing data SHALL not be lost

### Requirement: Initialization logging

The database initialization process SHALL log its progress and completion status.

#### Scenario: Successful initialization logged
- **WHEN** the database initialization completes successfully
- **THEN** a success message SHALL be logged for each table created or verified
- **AND** a final confirmation message SHALL indicate initialization is complete

#### Scenario: Initialization errors logged
- **WHEN** an error occurs during database initialization
- **THEN** the error SHALL be logged with appropriate detail
- **AND** the error SHALL be propagated to the calling process

### Requirement: Foreign key constraints

The database SHALL enforce foreign key relationships between tables.

#### Scenario: TicketTypes references Events
- **WHEN** a TicketType record is inserted
- **THEN** the event_id SHALL reference a valid Event id
- **AND** attempts to insert invalid event_id values SHALL be rejected

#### Scenario: SoldTickets references TicketTypes
- **WHEN** a SoldTicket record is inserted
- **THEN** the ticket_type_id SHALL reference a valid TicketType id
- **AND** attempts to insert invalid ticket_type_id values SHALL be rejected
