## Context

The Admin backend currently has minimal API infrastructure. This design extends the existing Express server (`Admin/backend/src/server.ts`) to support full CRUD operations for events and ticket types. The database schema needs a minor extension to support event images, and we need to add file upload handling for storing event image assets.

The Admin side serves authenticated users who manage event catalog and ticket configurations. The Frontside will consume these data through its own backend API layer (separate concern, not addressed here).

## Goals / Non-Goals

**Goals:**
- Implement 10 REST endpoints (6 for events, 4 for ticket types)
- Extend Events table with optional `image` field
- Support image file uploads with proper storage and path persistence
- Ensure cascade deletion of ticket types when parent event is deleted
- Maintain referential integrity between Events and TicketTypes tables

**Non-Goals:**
- Authentication/authorization middleware (deferred to future change)
- Frontend integration (UI will be addressed separately)
- Image processing/resizing (store images as-is)
- Frontside backend APIs (strict separation maintained)

## Decisions

### 1. Database Schema Extension

**Decision:** Add `image TEXT NULL` column to Events table via database migration.

**Rationale:** 
- Minimal schema change, backwards compatible
- NULL allows existing events to remain valid
- TEXT type sufficient for storing relative file paths

**Alternatives Considered:**
- Separate Images table: Over-engineering for single optional field
- Store full URLs: Complicates deployment and environment management

### 2. Image Upload Handling

**Decision:** Use `multer` middleware with local file storage in `uploads/events/` directory.

**Rationale:**
- Industry-standard multipart/form-data handling for Node.js/Express
- Simple filesystem storage suitable for current scale
- Relative paths stored in database enable portability

**Alternatives Considered:**
- Cloud storage (S3): Premature for MVP, adds external dependencies
- Base64 in database: Poor performance, bloats database size

**Configuration:**
- Storage path: `uploads/events/` (relative to server root)
- Filename format: `{eventId}-{timestamp}.{ext}`
- Accepted file types: `.jpg`, `.jpeg`, `.png`, `.gif`
- Max file size: 2MB

### 3. API Route Structure

**Decision:** RESTful routes mounted under `/api` prefix.

**Routes:**
```
GET    /api/events           - List all events
GET    /api/events/:id       - Get single event
POST   /api/events           - Create event
PATCH  /api/events/:id       - Update event
DELETE /api/events/:id       - Delete event (cascade tickets)
POST   /api/events/:id/image - Upload event image

POST   /api/tickets          - Create ticket type
GET    /api/tickets          - List all ticket types
PATCH  /api/tickets/:id      - Update ticket type
DELETE /api/tickets/:id      - Delete ticket type
```

**Rationale:**
- Standard REST conventions for predictable API design
- Separate image upload endpoint for multipart handling
- Ticket types use `/tickets` (not nested) for simpler queries

**Alternatives Considered:**
- Nested tickets under events (`/api/events/:id/tickets`): Complicates listing all tickets across events

### 4. Cascade Delete Implementation

**Decision:** Database-level foreign key with `ON DELETE CASCADE` for TicketTypes referencing Events.

**Rationale:**
- Guarantees referential integrity at database layer
- Atomic operation prevents orphaned records
- No application-level transaction logic needed

**Migration:**
```sql
-- Ensure foreign key constraint with cascade
PRAGMA foreign_keys = ON;

-- TicketTypes.eventid references Events.id with ON DELETE CASCADE
-- (Verify/update existing schema if needed)
```

### 5. Request/Response Format

**Decision:** JSON for all endpoints except image upload (multipart/form-data).

**Event JSON Structure:**
```json
{
  "id": 1,
  "name": "Summer Concert",
  "presenter": "Local Band",
  "date": "2026-07-15",
  "fromTime": "19:00",
  "toTime": "22:00",
  "description": "Outdoor concert event",
  "ticketidprefix": "SCD", //  regex:  [A-Z]{3}
  "image": "uploads/events/1-1234567890.jpg"
}
```

**Ticket Type JSON Structure:**
```json
{
  "id": 1,
  "eventId": 1,
  "typename": "Adult",
  "price": 25.00,
  "maxQuantity": 100,
  "soldQuantity": 0
}
```

**Rationale:**
- Consistent JSON API contract
- Decimal precision for price (two decimal places)
- Clear field naming matches database schema

### 6. Error Handling Strategy

**Decision:** HTTP status codes with JSON error responses.

**Status Codes:**
- `200 OK` - Successful GET, PATCH, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Database/server errors

**Error Response Format:**
```json
{
  "error": "Event not found",
  "code": "EVENT_NOT_FOUND"
}
```

**Rationale:**
- Standard HTTP semantics
- Machine-readable error codes for frontend handling
- Consistent error structure across all endpoints

## Risks / Trade-offs

**[Risk]** File upload without authentication → **Mitigation:** Accept risk for MVP, add auth in next iteration  
**[Risk]** Local file storage not scalable → **Mitigation:** Easy to migrate to cloud storage later using same path-based approach  
**[Risk]** No image validation beyond file type → **Mitigation:** Accept for MVP, can add virus scanning/content validation later  
**[Trade-off]** DELETE cascade automatic → **Trade-off:** No soft delete or archive; accepted for simplicity  
**[Trade-off]** Ticket types not nested under events → **Trade-off:** Simpler queries but requires eventId filtering; accepted for flexibility

## Migration Plan

Not applicable - this is initial API implementation, not a migration.

**Deployment Steps:**
1. Install `multer` dependency: `npm install multer`
2. Create `uploads/events/` directory with write permissions
3. Run database migration to add `image` column to Events table
4. Deploy updated `server.ts` with new routes
5. Verify foreign key constraints are enabled in SQLite

**Rollback Strategy:**
- Remove API routes from server.ts
- Optionally drop `image` column (non-breaking if NULL)

## Open Questions

None - design is ready for implementation.
