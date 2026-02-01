## ADDED Requirements

### Requirement: Store uploaded images

The system SHALL store uploaded event images in the local filesystem under the uploads/events/ directory.

#### Scenario: Create storage directory if not exists
- **WHEN** an image upload request is processed and the uploads/events/ directory does not exist
- **THEN** the system creates the directory structure automatically

#### Scenario: Generate unique filename
- **WHEN** an image is uploaded for an event
- **THEN** the system generates a unique filename using the format {eventId}-{timestamp}.{extension}

#### Scenario: Preserve original file extension
- **WHEN** an image with extension .jpg, .jpeg, .png, .webp or .gif is uploaded
- **THEN** the system preserves the original file extension in the stored filename

### Requirement: Persist image path in database

The system SHALL store the relative path to uploaded images in the Events table image field.

#### Scenario: Store relative path
- **WHEN** an image is successfully uploaded and stored in uploads/events/
- **THEN** the system updates the event's image field with the relative path (e.g., "uploads/events/1-1234567890.jpg")

#### Scenario: Path format consistency
- **WHEN** multiple images are uploaded for different events
- **THEN** all stored paths use the same relative path format starting with "uploads/events/"

### Requirement: Handle file type validation

The system SHALL validate uploaded files to ensure only accepted image types are stored.

#### Scenario: Accept JPEG images
- **WHEN** a file with .jpg or .jpeg extension is uploaded
- **THEN** the system accepts and stores the file

#### Scenario: Accept PNG images
- **WHEN** a file with .png extension is uploaded
- **THEN** the system accepts and stores the file

#### Scenario: Accept GIF images
- **WHEN** a file with .gif extension is uploaded
- **THEN** the system accepts and stores the file
  
Scenario: Accept WEBP images
WHEN a file with .webp extension is uploaded
THEN the system accepts and stores the file

#### Scenario: Reject non-image files
- **WHEN** a file with an extension other than .jpg, .jpeg, .png, .webp or .gif is uploaded
- **THEN** the system rejects the upload and returns an error

### Requirement: Enforce file size limit

The system SHALL enforce a maximum file size limit of 2MB for uploaded images.

#### Scenario: Accept file within size limit
- **WHEN** an image file of 2MB or less is uploaded
- **THEN** the system accepts and stores the file

#### Scenario: Reject file exceeding size limit
- **WHEN** an image file larger than 2MB is uploaded
- **THEN** the system rejects the upload and returns an error indicating the file size exceeds the limit

### Requirement: Handle multipart form data

The system SHALL accept image uploads using multipart/form-data encoding.

#### Scenario: Parse multipart request
- **WHEN** a POST request with Content-Type: multipart/form-data is received at the image upload endpoint
- **THEN** the system successfully parses the request and extracts the image file

#### Scenario: Support standard file field names
- **WHEN** the multipart form contains a file field for the image
- **THEN** the system correctly identifies and processes the uploaded file

### Requirement: Replace existing images

The system SHALL handle image replacement when uploading a new image for an event that already has one.

#### Scenario: Overwrite existing image path
- **WHEN** a new image is uploaded for an event that already has an image field value
- **THEN** the system updates the image field with the new file path

#### Scenario: Delete old file from storage
- **WHEN** a new image is uploaded replacing an existing one
- **THEN** the old image file is deleted from the uploads/events/ directory
