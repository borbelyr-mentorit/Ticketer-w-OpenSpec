## ADDED Requirements

### Requirement: List all events

The system SHALL provide an endpoint to retrieve all events from the database with their complete details.

#### Scenario: Successful retrieval of all events
- **WHEN** a GET request is made to `/api/events`
- **THEN** the system returns HTTP 200 with a JSON array containing all events including id, name, presenter, date, fromTime, toTime, description, and image fields

#### Scenario: Empty events list
- **WHEN** a GET request is made to `/api/events` and no events exist
- **THEN** the system returns HTTP 200 with an empty JSON array

### Requirement: Get single event by ID

The system SHALL provide an endpoint to retrieve a specific event by its ID with all details including the ticket ID prefix.

#### Scenario: Successful retrieval of existing event
- **WHEN** a GET request is made to `/api/events/{id}` with a valid event ID
- **THEN** the system returns HTTP 200 with a JSON object containing the event details including id, name, presenter, date, fromTime, toTime, description, ticketidprefix, and image

#### Scenario: Event not found
- **WHEN** a GET request is made to `/api/events/{id}` with a non-existent event ID
- **THEN** the system returns HTTP 404 with an error message indicating the event was not found

### Requirement: Create new event

The system SHALL provide an endpoint to create a new event with all required details and optional image field.

#### Scenario: Successful event creation
- **WHEN** a POST request is made to `/api/events` with valid JSON body containing name, presenter, date, fromTime, toTime, description, and ticketidprefix
- **THEN** the system creates the event in the database and returns HTTP 201 with the created event including its assigned ID

#### Skip Scenario: Event creation with optional image field
- **WHEN** a POST request is made to `/api/events` with valid data including an image path
- **THEN** the system creates the event with the image field populated and returns HTTP 201

#### Scenario: Event creation with missing required fields
- **WHEN** a POST request is made to `/api/events` with missing required fields (name, presenter, date, fromTime, toTime, description, or ticketidprefix)
- **THEN** the system returns HTTP 400 with an error message indicating which required fields are missing

#### Scenario: Event creation with invalid date format
- **WHEN** a POST request is made to `/api/events` with an invalid date format  (valid format:  YYYY-MM-DD)
- **THEN** the system returns HTTP 400 with an error message indicating invalid date format

### Requirement: Update event

The system SHALL provide an endpoint to update selected fields of an existing event.

#### Scenario: Successful partial update
- **WHEN** a PATCH request is made to `/api/events/{id}` with valid JSON body containing one or more fields to update (name, presenter, date, fromTime, toTime, description, ticketidprefix, or image)
- **THEN** the system updates only the specified fields in the database and returns HTTP 200 with the updated event

#### Scenario: Update non-existent event
- **WHEN** a PATCH request is made to `/api/events/{id}` with a non-existent event ID
- **THEN** the system returns HTTP 404 with an error message indicating the event was not found

#### Scenario: Update with invalid data
- **WHEN** a PATCH request is made to `/api/events/{id}` with invalid field values
- **THEN** the system returns HTTP 400 with an error message indicating validation errors

### Requirement: Delete event

The system SHALL provide an endpoint to delete an event and all its associated ticket types.

#### Scenario: Successful event deletion
- **WHEN** a DELETE request is made to `/api/events/{id}` with a valid event ID
- **THEN** the system deletes the event and all related ticket types from the database and returns HTTP 200

#### Scenario: Delete non-existent event
- **WHEN** a DELETE request is made to `/api/events/{id}` with a non-existent event ID
- **THEN** the system returns HTTP 404 with an error message indicating the event was not found

#### Scenario: Cascade deletion of ticket types
- **WHEN** a DELETE request is made to `/api/events/{id}` and the event has associated ticket types
- **THEN** the system deletes both the event and all associated ticket types automatically

### Requirement: Upload event image

The system SHALL provide an endpoint to upload an image file for a specific event and store its relative path in the database.

#### Scenario: Successful image upload
- **WHEN** a POST request is made to `/api/events/{id}/image` with a valid image file in multipart/form-data format
- **THEN** the system stores the image file in the uploads/events/ directory, updates the event's image field with the relative path, and returns HTTP 200 with the updated event

#### Scenario: Upload image for non-existent event
- **WHEN** a POST request is made to `/api/events/{id}/image` with a non-existent event ID
- **THEN** the system returns HTTP 404 with an error message indicating the event was not found

#### Scenario: Upload invalid file type
- **WHEN** a POST request is made to `/api/events/{id}/image` with a file that is not an accepted image type (.jpg, .jpeg, .png, .gif, .webp)
- **THEN** the system returns HTTP 400 with an error message indicating invalid file type

#### Scenario: Upload file exceeding size limit
- **WHEN** a POST request is made to `/api/events/{id}/image` with a file larger than 2MB
- **THEN** the system returns HTTP 400 with an error message indicating file size exceeds limit

#### Scenario: Replace existing image
- **WHEN** a POST request is made to `/api/events/{id}/image` for an event that already has an image
- **THEN** the system replaces the old image file with the new one and updates the image field path
