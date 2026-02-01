## ADDED Requirements

### Requirement: Responsive Dashboard Layout
The Admin application SHALL implement a responsive dashboard layout consistent with the Vristo theme, dividing the viewport into logical zones for navigation, utility actions, and primary content.

#### Scenario: Desktop view rendering
- **WHEN** the user accesses the application on a desktop screen
- **THEN** the header, sidebar, main content area, and footer SHALL all be visible simultaneously

#### Scenario: Mobile view adaptive layout
- **WHEN** the user accesses the application on a mobile device
- **THEN** the sidebar SHALL be hidden by default and accessible via a toggle in the header

### Requirement: Modular Layout Components
The layout SHALL be decomposed into separate, reusable components located in the `src/components/layout` directory (or similar structure) to ensure maintainability.

#### Scenario: Component separation
- **WHEN** reviewing the source code
- **THEN** the Header, Sidebar, Content Area, and Footer SHALL exist as independent React components in their own files

### Requirement: Main Content Container
The layout SHALL provide a dedicated main content area that dynamically renders child components based on the current route.

#### Scenario: Route-based content rendering
- **WHEN** the user navigates between different admin routes
- **THEN** only the Main Content Area SHALL refresh its content while the layout shell remains persistent

### Requirement: Theme Consistency
The base layout SHALL apply CSS classes and structural patterns from the Vristo theme to ensure visual consistency with the provided reference layout.

#### Scenario: Applying theme styles
- **WHEN** the layout is rendered
- **THEN** it SHALL use the Vristo theme's container classes, spacing, and typography
