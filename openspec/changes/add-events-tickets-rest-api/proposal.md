## Why

The Admin backend currently lacks a structured REST API for managing events and ticket types. To enable the Admin frontend to perform CRUD operations on events and tickets, and to support image uploads for events, we need to implement a comprehensive set of REST endpoints with proper database schema extensions.

## What Changes

- Extend the Events table schema to include an optional `image` field for storing image file paths
- Implement 6 REST endpoints for event management (list, get, create, update, delete, image upload)
- Implement 4 REST endpoints for ticket type management (create, list, update, delete)
- Add cascade delete functionality to remove related tickets when an event is deleted
- Support multipart/form-data for image uploads with proper file storage handling

## Capabilities

### New Capabilities
- `events-rest-api`: Complete REST API for event CRUD operations including GET /events, GET /events/{id}, POST /events, PATCH /events/{id}, DELETE /events/{id}, and POST /events/{id}/image
- `tickets-rest-api`: Complete REST API for ticket type management including POST /tickets, GET /tickets, PATCH /tickets/{id}, and DELETE /tickets/{id}
- `events-image-upload`: Handle image uploads for events with file storage and path persistence in the database

### Modified Capabilities
- `database-schema`: Add optional `image` field to Events table to store relative file paths

## Impact

**Affected Components:**
- Admin backend (`Admin/backend/src/server.ts`)
- Database schema (Events table modification)
- File storage system (new directory/handling for event images)

**Dependencies:**
- Multipart form data parsing library (e.g., multer) for image uploads
- File system operations for storing uploaded images

**Breaking Changes:**
- None - the image field is optional and existing event records remain compatible
