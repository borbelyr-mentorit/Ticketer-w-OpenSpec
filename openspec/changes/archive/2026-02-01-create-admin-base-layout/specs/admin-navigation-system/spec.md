## ADDED Requirements

### Requirement: Collapsible Sidebar Navigation
The Admin application SHALL feature a left-hand navigation sidebar that can be collapsed or expanded to optimize screen space.

#### Scenario: Toggling sidebar state
- **WHEN** the user clicks the toggle button in the header
- **THEN** the sidebar SHALL switch between expanded and collapsed (icon-only) states

### Requirement: Structured Menu Organization
Navigation links SHALL be organized into logical groups and managed from a dedicated `src/components/layout/menus` directory.

#### Scenario: Accessing menu configuration
- **WHEN** a developer needs to add an admin module
- **THEN** they SHALL find the menu definitions in the dedicated menus folder

### Requirement: Header Utility Navigation
The page header SHALL contain global navigation elements including a logo, a sidebar toggle, and a user profile dropdown.

#### Scenario: User profile display
- **WHEN** the user is logged in  (will be implemented later, show only icon)
- **THEN** their profile icon SHALL be visible in the top right corner of the header

### Requirement: Active State Visualization
The navigation system SHALL visually highlight the link corresponding to the current active route.

#### Scenario: Highlighting current page
- **WHEN** the user is on the "Events" page
- **THEN** the "Events" navigation item in the sidebar SHALL display an "active" style
