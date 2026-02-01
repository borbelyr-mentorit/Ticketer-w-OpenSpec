## 1. Database Migration

- [x] 1.1 Create database migration script to add `image` column to Events table (TEXT NULL type)
- [x] 1.2 Update database initialization script to include image column in Events table schema
- [x] 1.3 Verify foreign key constraint on TicketTypes.eventid references Events.id with ON DELETE CASCADE
- [x] 1.4 Test database migration runs idempotently without errors
- [x] 1.5 Enable PRAGMA foreign_keys = ON in database connection initialization

## 2. Dependency Installation

- [x] 2.1 Add `multer` package to Admin/backend/package.json dependencies
- [x] 2.2 Run `npm install` in Admin/backend directory
- [x] 2.3 Create `uploads/events/` directory structure in Admin/backend with proper permissions

## 3. File Upload Middleware Configuration

- [x] 3.1 Import multer in Admin/backend/src/server.ts
- [x] 3.2 Configure multer storage with destination `uploads/events/` and filename format `{eventId}-{timestamp}.{ext}`
- [x] 3.3 Configure multer file filter to accept only .jpg, .jpeg, .png, .webp, .gif extensions
- [x] 3.4 Set multer file size limit to 2MB
- [x] 3.5 Create multer upload middleware instance

## 4. Events REST API - List Endpoint

- [ ] 4.1 Implement GET /api/events route handler
- [ ] 4.2 Query database to retrieve all events with all fields (id, name, presenter, date, fromTime, toTime, description, image)
- [ ] 4.3 Return HTTP 200 with JSON array of events
- [ ] 4.4 Handle database errors and return HTTP 500 with error message

## 5. Events REST API - Get Single Event Endpoint

- [ ] 5.1 Implement GET /api/events/:id route handler
- [ ] 5.2 Query database to retrieve event by id including ticketidprefix field
- [ ] 5.3 Return HTTP 200 with JSON object if event found
- [ ] 5.4 Return HTTP 404 with error message if event not found
- [ ] 5.5 Handle database errors and return HTTP 500 with error message

## 6. Events REST API - Create Event Endpoint

- [ ] 6.1 Implement POST /api/events route handler
- [ ] 6.2 Validate required fields in request body (name, presenter, date, fromTime, toTime, description, ticketidprefix)
- [ ] 6.3 Return HTTP 400 with error message if required fields are missing
- [ ] 6.4 Validate date format and return HTTP 400 if invalid
- [ ] 6.5 Insert new event into database with optional image field
- [ ] 6.6 Return HTTP 201 with created event including assigned id
- [ ] 6.7 Handle database errors and return HTTP 500 with error message

## 7. Events REST API - Update Event Endpoint

- [ ] 7.1 Implement PATCH /api/events/:id route handler
- [ ] 7.2 Query database to verify event exists
- [ ] 7.3 Return HTTP 404 with error message if event not found
- [ ] 7.4 Validate fields in request body if provided (name, presenter, date, fromTime, toTime, description, ticketidprefix, image)
- [ ] 7.5 Return HTTP 400 with error message if field validation fails
- [ ] 7.6 Update only provided fields in database
- [ ] 7.7 Return HTTP 200 with updated event object
- [ ] 7.8 Handle database errors and return HTTP 500 with error message

## 8. Events REST API - Delete Event Endpoint

- [ ] 8.1 Implement DELETE /api/events/:id route handler
- [ ] 8.2 Query database to verify event exists
- [ ] 8.3 Return HTTP 404 with error message if event not found
- [ ] 8.4 Delete event from database (cascade delete will remove ticket types automatically)
- [ ] 8.5 Return HTTP 200 with success message
- [ ] 8.6 Handle database errors and return HTTP 500 with error message

## 9. Events REST API - Image Upload Endpoint

- [ ] 9.1 Implement POST /api/events/:id/image route handler with multer middleware
- [ ] 9.2 Query database to verify event exists
- [ ] 9.3 Return HTTP 404 with error message if event not found
- [ ] 9.4 Return HTTP 400 if no file uploaded or invalid file type
- [ ] 9.5 Return HTTP 400 if file size exceeds 2MB limit
- [ ] 9.6 Generate filename using format {eventId}-{timestamp}.{ext}
- [ ] 9.7 Save uploaded file to uploads/events/ directory
- [ ] 9.8 Update event's image field in database with relative path
- [ ] 9.9 Return HTTP 200 with updated event object including image path
- [ ] 9.10 Handle file system and database errors and return HTTP 500 with error message

## 10. Tickets REST API - Create Ticket Type Endpoint

- [ ] 10.1 Implement POST /api/tickets route handler
- [ ] 10.2 Validate required fields in request body (eventId, typename, price, maxQuantity)
- [ ] 10.3 Return HTTP 400 with error message if required fields are missing
- [ ] 10.4 Validate eventId references an existing event
- [ ] 10.5 Return HTTP 400 with error message if eventId is invalid
- [ ] 10.6 Validate price has exactly 2 decimal places
- [ ] 10.7 Return HTTP 400 with error message if price format is invalid
- [ ] 10.8 Validate maxQuantity is an integer
- [ ] 10.9 Return HTTP 400 with error message if maxQuantity is not an integer
- [ ] 10.10 Insert new ticket type into database with soldQuantity initialized to 0
- [ ] 10.11 Return HTTP 201 with created ticket type including assigned id
- [ ] 10.12 Handle database errors and return HTTP 500 with error message

## 11. Tickets REST API - List Ticket Types Endpoint

- [ ] 11.1 Implement GET /api/tickets route handler
- [ ] 11.2 Query database to retrieve all ticket types with all fields (id, eventId, typename, price, maxQuantity, soldQuantity)
- [ ] 11.3 Return HTTP 200 with JSON array of ticket types
- [ ] 11.4 Handle database errors and return HTTP 500 with error message

## 12. Tickets REST API - Update Ticket Type Endpoint

- [ ] 12.1 Implement PATCH /api/tickets/:id route handler
- [ ] 12.2 Query database to verify ticket type exists
- [ ] 12.3 Return HTTP 404 with error message if ticket type not found
- [ ] 12.4 Validate fields in request body if provided (price, maxQuantity)
- [ ] 12.5 Validate price format if provided (2 decimal places)
- [ ] 12.6 Return HTTP 400 with error message if price format is invalid
- [ ] 12.7 Validate maxQuantity is integer if provided
- [ ] 12.8 Return HTTP 400 with error message if maxQuantity is not an integer
- [ ] 12.9 Update only provided fields in database
- [ ] 12.10 Return HTTP 200 with updated ticket type object
- [ ] 12.11 Handle database errors and return HTTP 500 with error message

## 13. Tickets REST API - Delete Ticket Type Endpoint

- [ ] 13.1 Implement DELETE /api/tickets/:id route handler
- [ ] 13.2 Query database to verify ticket type exists
- [ ] 13.3 Return HTTP 404 with error message if ticket type not found
- [ ] 13.4 Delete ticket type from database
- [ ] 13.5 Return HTTP 200 with success message
- [ ] 13.6 Handle database errors and return HTTP 500 with error message

## 14. Error Response Standardization

- [ ] 14.1 Create error response helper function with format {error: "message", code: "ERROR_CODE"}
- [ ] 14.2 Standardize all error responses across endpoints to use consistent format
- [ ] 14.3 Define error codes for common scenarios (EVENT_NOT_FOUND, TICKET_NOT_FOUND, INVALID_INPUT, etc.)

## 15. Testing and Verification

- [ ] 15.1 Test GET /api/events returns all events successfully
- [ ] 15.2 Test GET /api/events/:id returns single event successfully
- [ ] 15.3 Test POST /api/events creates new event successfully
- [ ] 15.4 Test PATCH /api/events/:id updates event successfully
- [ ] 15.5 Test DELETE /api/events/:id deletes event and cascades to ticket types
- [ ] 15.6 Test POST /api/events/:id/image uploads image successfully
- [ ] 15.7 Test POST /api/tickets creates ticket type successfully
- [ ] 15.8 Test GET /api/tickets returns all ticket types successfully
- [ ] 15.9 Test PATCH /api/tickets/:id updates ticket type successfully
- [ ] 15.10 Test DELETE /api/tickets/:id deletes ticket type successfully
- [ ] 15.11 Test error responses return correct HTTP status codes and error messages
- [ ] 15.12 Verify uploads/events/ directory is created and files are stored correctly
- [ ] 15.13 Verify database image field is populated with correct relative paths
- [ ] 15.14 Test file upload rejects files exceeding 2MB size limit
- [ ] 15.15 Test file upload rejects non-image file types

---

## Effort Estimation

### Summary by Section

| Section | Tasks | Estimated Hours | Complexity | Notes |
|---------|-------|----------------|------------|-------|
| 1. Database Migration | 5 | 2.0h | Medium | Requires careful schema changes and testing |
| 2. Dependency Installation | 3 | 0.5h | Low | Simple package installation |
| 3. File Upload Middleware Configuration | 5 | 1.5h | Medium | Multer setup and configuration |
| 4. Events REST API - List Endpoint | 4 | 1.0h | Low | Basic CRUD operation |
| 5. Events REST API - Get Single Event | 5 | 1.0h | Low | Basic CRUD with error handling |
| 6. Events REST API - Create Event | 7 | 2.0h | Medium | Input validation complexity |
| 7. Events REST API - Update Event | 8 | 2.5h | Medium | Partial update logic and validation |
| 8. Events REST API - Delete Event | 6 | 1.5h | Medium | Cascade delete verification |
| 9. Events REST API - Image Upload | 10 | 3.0h | High | File handling, storage, and error cases |
| 10. Tickets REST API - Create Ticket | 12 | 3.0h | High | Complex validation (price format, foreign key) |
| 11. Tickets REST API - List Tickets | 4 | 1.0h | Low | Basic CRUD operation |
| 12. Tickets REST API - Update Ticket | 11 | 2.5h | Medium | Validation and partial update logic |
| 13. Tickets REST API - Delete Ticket | 6 | 1.5h | Medium | Standard delete with checks |
| 14. Error Response Standardization | 3 | 1.5h | Low | Helper function and refactoring |
| 15. Testing and Verification | 15 | 4.0h | Medium | Comprehensive testing across all endpoints |
| **TOTAL** | **103** | **28.5h** | | **~3.5 days** (8h/day) |

### Breakdown by Category

| Category | Hours | Percentage |
|----------|-------|------------|
| Database & Setup | 4.0h | 14% |
| Events API Implementation | 11.0h | 39% |
| Tickets API Implementation | 8.0h | 28% |
| Error Handling & Standards | 1.5h | 5% |
| Testing & Verification | 4.0h | 14% |

### Critical Path Items

1. **Database Migration (2.0h)** - Must be completed first; blocks all API work
2. **File Upload Middleware (1.5h)** - Required before image upload endpoint
3. **Error Response Standardization (1.5h)** - Should be done early to avoid refactoring

### Risk Factors

- **Image upload endpoint** has highest complexity; allocate extra buffer time
- **Price validation** (2 decimal places) may require additional precision handling
- **Cascade delete** testing needs thorough verification to prevent data loss
- **Foreign key constraints** must be verified in SQLite (PRAGMA foreign_keys)

### Recommended Approach

**Day 1 (8h):**
- Database Migration (2.0h)
- Dependency Installation (0.5h)
- File Upload Middleware (1.5h)
- Error Response Standardization (1.5h)
- Events List & Get endpoints (2.0h)
- Buffer (0.5h)

**Day 2 (8h):**
- Events Create endpoint (2.0h)
- Events Update endpoint (2.5h)
- Events Delete endpoint (1.5h)
- Events Image Upload endpoint (2.0h)

**Day 3 (8h):**
- Complete Image Upload endpoint (1.0h)
- Tickets Create endpoint (3.0h)
- Tickets List endpoint (1.0h)
- Tickets Update endpoint (2.5h)
- Buffer (0.5h)

**Day 4 (4.5h):**
- Tickets Delete endpoint (1.5h)
- Testing and Verification (3.0h)

**Total: 28.5 hours (~3.5 working days)**
