## ADDED Requirements

### Requirement: Express server initialization

The Admin backend SHALL initialize an Express server instance that listens on port 5001.

#### Scenario: Server starts successfully
- **WHEN** the Admin backend application is started
- **THEN** an Express server SHALL be created and listening on port 5001
- **AND** the server SHALL log a confirmation message indicating it is running

### Requirement: SQLite database connection

The Admin backend SHALL establish a connection to the SQLite database file at the root level (Ticketer.db.sqlite).

#### Scenario: Database connection on startup
- **WHEN** the Admin backend server starts
- **THEN** a connection to the SQLite database SHALL be established
- **AND** the database initialization script SHALL be executed

#### Scenario: Database connection failure handling
- **WHEN** the SQLite database cannot be accessed
- **THEN** the server SHALL log an error message
- **AND** the server SHALL exit with a non-zero status code

### Requirement: CORS configuration

The Admin backend SHALL configure CORS to allow requests from the Admin frontend (http://localhost:5002/admin).

#### Scenario: CORS headers for Admin frontend
- **WHEN** a request is received from http://localhost:5002/admin
- **THEN** the server SHALL include appropriate CORS headers in the response
- **AND** the request SHALL be processed normally

### Requirement: JSON body parsing

The Admin backend SHALL parse incoming JSON request bodies for all API endpoints.

#### Scenario: JSON request body parsing
- **WHEN** a POST or PUT request is received with a JSON content-type
- **THEN** the request body SHALL be parsed as JSON
- **AND** the parsed data SHALL be available in req.body

### Requirement: Health check endpoint

The Admin backend SHALL provide a health check endpoint at GET /health.

#### Scenario: Health check returns success
- **WHEN** a GET request is made to /health
- **THEN** the server SHALL respond with HTTP status 200
- **AND** the response body SHALL contain {"status": "ok"}

### Requirement: API route prefix

The Admin backend SHALL serve all API endpoints under the /api prefix.

#### Scenario: API routes under /api
- **WHEN** API endpoints are registered
- **THEN** they SHALL all be accessible under the /api path prefix
- **AND** requests to /api SHALL be routed to the appropriate handlers

### Requirement: Package dependencies

The Admin backend SHALL declare all required npm dependencies in /Admin/backend/package.json.

#### Scenario: Package.json contains required dependencies
- **WHEN** the package.json file is examined
- **THEN** it SHALL include express, sqlite3, and cors as dependencies
- **AND** it SHALL include appropriate scripts for starting the server
