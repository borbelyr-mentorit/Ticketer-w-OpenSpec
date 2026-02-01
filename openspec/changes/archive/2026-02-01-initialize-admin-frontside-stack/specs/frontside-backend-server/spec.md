## ADDED Requirements

### Requirement: Express server initialization

The Frontside backend SHALL initialize an Express server instance that listens on port 5003.

#### Scenario: Server starts successfully
- **WHEN** the Frontside backend application is started
- **THEN** an Express server SHALL be created and listening on port 5003
- **AND** the server SHALL log a confirmation message indicating it is running

### Requirement: SQLite database connection

The Frontside backend SHALL establish a connection to the SQLite database file at the root level (Ticketer.db.sqlite).

#### Scenario: Database connection on startup
- **WHEN** the Frontside backend server starts
- **THEN** a connection to the SQLite database SHALL be established
- **AND** the database initialization script SHALL be executed

#### Scenario: Database connection failure handling
- **WHEN** the SQLite database cannot be accessed
- **THEN** the server SHALL log an error message
- **AND** the server SHALL exit with a non-zero status code

### Requirement: CORS configuration

The Frontside backend SHALL configure CORS to allow requests from the Frontside frontend (http://localhost:5004).

#### Scenario: CORS headers for Frontside frontend
- **WHEN** a request is received from http://localhost:5004
- **THEN** the server SHALL include appropriate CORS headers in the response
- **AND** the request SHALL be processed normally

### Requirement: JSON body parsing

The Frontside backend SHALL parse incoming JSON request bodies for all API endpoints.

#### Scenario: JSON request body parsing
- **WHEN** a POST or PUT request is received with a JSON content-type
- **THEN** the request body SHALL be parsed as JSON
- **AND** the parsed data SHALL be available in req.body

### Requirement: Health check endpoint

The Frontside backend SHALL provide a health check endpoint at GET /health.

#### Scenario: Health check returns success
- **WHEN** a GET request is made to /health
- **THEN** the server SHALL respond with HTTP status 200
- **AND** the response body SHALL contain {"status": "ok"}

### Requirement: API route prefix

The Frontside backend SHALL serve all API endpoints under the /api prefix.

#### Scenario: API routes under /api
- **WHEN** API endpoints are registered
- **THEN** they SHALL all be accessible under the /api path prefix
- **AND** requests to /api SHALL be routed to the appropriate handlers

### Requirement: Package dependencies

The Frontside backend SHALL declare all required npm dependencies in /Frontside/backend/package.json.

#### Scenario: Package.json contains required dependencies
- **WHEN** the package.json file is examined
- **THEN** it SHALL include express, sqlite3, and cors as dependencies
- **AND** it SHALL include appropriate scripts for starting the server

### Requirement: Test infrastructure preparation

The Frontside backend SHALL have a tests/ directory prepared for future test implementation.

#### Scenario: Test directory exists
- **WHEN** the Frontside backend directory is examined
- **THEN** it SHALL contain a tests/ directory
- **AND** the directory SHALL contain placeholder test files with TODO comments
