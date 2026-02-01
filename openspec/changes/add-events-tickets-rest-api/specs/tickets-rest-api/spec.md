## ADDED Requirements

### Requirement: Create ticket type

The system SHALL provide an endpoint to create a new ticket type associated with an event.

#### Scenario: Successful ticket type creation
- **WHEN** a POST request is made to `/api/tickets` with valid JSON body containing eventId, typename, price, and maxQuantity
- **THEN** the system creates the ticket type in the database with soldQuantity initialized to 0 and returns HTTP 201 with the created ticket type including its assigned ID

#### Scenario: Create ticket with missing required fields
- **WHEN** a POST request is made to `/api/tickets` with missing required fields (eventId, typename, price, or maxQuantity)
- **THEN** the system returns HTTP 400 with an error message indicating which required fields are missing

#### Scenario: Create ticket for non-existent event
- **WHEN** a POST request is made to `/api/tickets` with an eventId that does not exist
- **THEN** the system returns HTTP 400 with an error message indicating invalid event reference

#### Scenario: Create ticket with invalid price format
- **WHEN** a POST request is made to `/api/tickets` with price not having exactly 2 decimal places
- **THEN** the system returns HTTP 400 with an error message indicating invalid price format

#### Scenario: Create ticket with non-integer maxQuantity
- **WHEN** a POST request is made to `/api/tickets` with maxQuantity as a non-integer value
- **THEN** the system returns HTTP 400 with an error message indicating maxQuantity must be an integer

### Requirement: List all ticket types

The system SHALL provide an endpoint to retrieve all ticket types from the database with their complete details.

#### Scenario: Successful retrieval of all ticket types
- **WHEN** a GET request is made to `/api/tickets`
- **THEN** the system returns HTTP 200 with a JSON array containing all ticket types including id, eventId, typename, price, maxQuantity, and soldQuantity

#### Scenario: Empty ticket types list
- **WHEN** a GET request is made to `/api/tickets` and no ticket types exist
- **THEN** the system returns HTTP 200 with an empty JSON array

#### Scenario: List includes tickets from all events
- **WHEN** a GET request is made to `/api/tickets` and multiple events have ticket types
- **THEN** the system returns all ticket types across all events without filtering

### Requirement: Update ticket type

The system SHALL provide an endpoint to update selected fields of an existing ticket type.

#### Scenario: Successful update of price
- **WHEN** a PATCH request is made to `/api/tickets/{id}` with valid JSON body containing a new price value
- **THEN** the system updates the price field in the database and returns HTTP 200 with the updated ticket type

#### Scenario: Successful update of maxQuantity
- **WHEN** a PATCH request is made to `/api/tickets/{id}` with valid JSON body containing a new maxQuantity value
- **THEN** the system updates the maxQuantity field in the database and returns HTTP 200 with the updated ticket type

#### Scenario: Update both price and maxQuantity
- **WHEN** a PATCH request is made to `/api/tickets/{id}` with valid JSON body containing both price and maxQuantity
- **THEN** the system updates both fields in the database and returns HTTP 200 with the updated ticket type

#### Scenario: Update non-existent ticket type
- **WHEN** a PATCH request is made to `/api/tickets/{id}` with a non-existent ticket ID
- **THEN** the system returns HTTP 404 with an error message indicating the ticket type was not found

#### Scenario: Update with invalid price
- **WHEN** a PATCH request is made to `/api/tickets/{id}` with an invalid price value
- **THEN** the system returns HTTP 400 with an error message indicating invalid price format

#### Scenario: Update with invalid maxQuantity
- **WHEN** a PATCH request is made to `/api/tickets/{id}` with a non-integer maxQuantity
- **THEN** the system returns HTTP 400 with an error message indicating maxQuantity must be an integer

### Requirement: Delete ticket type

The system SHALL provide an endpoint to delete a ticket type from the database.

#### Scenario: Successful ticket type deletion
- **WHEN** a DELETE request is made to `/api/tickets/{id}` with a valid ticket type ID
- **THEN** the system deletes the ticket type from the database and returns HTTP 200

#### Scenario: Delete non-existent ticket type
- **WHEN** a DELETE request is made to `/api/tickets/{id}` with a non-existent ticket type ID
- **THEN** the system returns HTTP 404 with an error message indicating the ticket type was not found

#### Scenario: Delete ticket type with sold tickets
- **WHEN** a DELETE request is made to `/api/tickets/{id}` for a ticket type that has soldQuantity greater than 0
- **THEN** the system deletes the ticket type and returns HTTP 200 (no restriction on deletion)
