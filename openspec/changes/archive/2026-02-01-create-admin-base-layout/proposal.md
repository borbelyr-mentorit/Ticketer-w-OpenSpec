## Why

The Admin frontend currently lacks a structured UI framework, making it difficult to manage and extend administrative features. Implementing a solid base layout using the Vristo theme will provide a professional, consistent user interface centered around administrative productivity, while ensuring a clear separation from the public Frontside application.

## What Changes

- **New Base Layout**: Implementation of a responsive dashboard layout structure in the Admin frontend.
- **Component Decomposition**: Development of reusable layout components:
  - **Page Header**: Global actions, search, and user profile navigation.
  - **Left Menu (Sidebar)**: Navigation for admin modules.
  - **Main Content Area**: Container for module-specific views.
  - **Page Footer**: Versioning and copyright information.
- **Theme Integration**: Application of Vristo theme styling and assets where applicable to the layout components.
- **Project Structure**: Creation of a dedicated components folder and a specific `menus` subfolder for navigation organization.

## Capabilities

### New Capabilities
- `admin-base-layout`: Defines the structural requirements, visual layout, and theme application rules for the Admin application shell.
- `admin-navigation-system`: Defines the requirements for the Sidebar and Header navigation systems, including dynamic menu rendering.

### Modified Capabilities
- (None)

## Impact

- **Admin Frontend (`/Admin/frontend`)**: Significant changes to `App.tsx` and source organization.
- **Assets**: Integration of Vristo theme CSS and JS assets into the build process.
- **Architecture**: Establishes the standard for how new Admin pages will be added (via the navigation system and content area).
