## Context

The Admin frontend currently serves basic content without a structured layout framework. The application needs a professional dashboard UI that follows the Vristo theme design patterns, as referenced in `__input_data/sample_Admin_layout.png`. This layout will establish the foundation for all future Admin features and must maintain strict separation from the Frontside application.

The current state:
- Admin frontend exists at `/Admin/frontend` with basic React setup
- Vristo theme assets are available in `public/assets/` (CSS and JS)
- No layout components currently exist
- `App.tsx` directly renders content without a wrapper structure

## Goals / Non-Goals

**Goals:**
- Implement a responsive dashboard shell with Header, Sidebar, Content Area, and Footer
- Establish component architecture in `src/components/layout/` directory
- Apply Vristo theme classes and styling consistently
- Support collapsible sidebar for desktop and mobile viewports
- Create a `menus` subfolder for navigation configuration
- Enable active route highlighting in navigation
- Provide a foundation for future Admin pages via React Router integration

**Non-Goals:**
- Authentication/authorization logic (future iteration)
- Actual admin feature pages (Events, Tickets, etc.) beyond placeholders
- Shared components with Frontside application
- Backend API integration for menu data

## Decisions

### Decision 1: Component-Based Layout Architecture
**Choice:** Separate layout into discrete React components (Header, Sidebar, MainContent, Footer) in `src/components/layout/`.

**Rationale:** 
- Promotes reusability and testability
- Makes it easy to modify individual layout sections without affecting others
- Aligns with React best practices
- Future developers can locate and update layout logic easily

**Alternatives Considered:**
- Monolithic layout in `App.tsx`: Rejected due to poor maintainability
- Shared layout library: Rejected to maintain Admin/Frontside separation

### Decision 2: State Management for Sidebar Toggle
**Choice:** Use React `useState` hook in a parent layout component to manage sidebar collapsed/expanded state.

**Rationale:**
- Simple, local state is sufficient for UI-only behavior
- No need for global state management (Redux/Context) for this feature
- Reduces complexity and dependencies

**Alternatives Considered:**
- Context API: Over-engineering for single-component state
- LocalStorage persistence: Deferred to future iteration if needed

### Decision 3: Navigation Menu Structure
**Choice:** Create a dedicated `src/components/layout/menus/` directory with a `MainMenu.tsx` component that exports menu item configurations as a data structure.

**Rationale:**
- Centralizes menu definitions for easy updates
- Supports future expansion (adding submenu, permissions logic)
- Separates data from rendering logic

**Alternatives Considered:**
- Hardcoded JSX in Sidebar: Difficult to maintain as menu grows
- JSON config file: Unnecessary complexity at this stage

### Decision 4: Vristo Theme Integration Approach
**Choice:** Import Vristo CSS/JS assets globally via `public/index.html` and apply theme classes directly in component JSX.

**Rationale:**
- Vristo is a pre-built theme with specific class conventions
- Global import ensures consistency across all components
- Existing asset structure in `public/assets/` supports this approach

**Alternatives Considered:**
- CSS Modules: Would require restructuring Vristo theme files
- Inline styles: Defeats the purpose of using a theme framework

### Decision 5: Responsive Behavior Implementation
**Choice:** Use CSS media queries from Vristo theme combined with conditional rendering based on viewport state (tracked via a custom hook or simple window resize listener).

**Rationale:**
- Vristo provides responsive utilities out of the box
- Conditional rendering handles sidebar visibility on mobile
- Keeps logic simple and maintainable

**Alternatives Considered:**
- Third-party responsive library: Unnecessary dependency when Vristo handles most cases

## Risks / Trade-offs

### Risk: Vristo Theme Asset Compatibility
**Description:** Vristo theme CSS/JS may conflict with React rendering or future dependencies.

**Mitigation:** Test thoroughly during implementation. If conflicts arise, scope Vristo classes to layout components only.

### Risk: Over-Engineering Navigation System
**Description:** Creating a complex menu structure prematurely could slow down initial development.

**Mitigation:** Start with a simple data array in `MainMenu.tsx`. Refactor to JSON/API-driven if complexity warrants it later.

### Trade-off: No Server-Side Menu Configuration
**Description:** Menu items are hardcoded in frontend rather than fetched from backend.

**Justification:** Admin features are still being defined. Dynamic menus can be added when user roles/permissions are implemented.

### Risk: Layout Breaking on Theme Updates
**Description:** If Vristo theme assets are updated, layout components may need adjustments.

**Mitigation:** Document which Vristo classes are used in each component. Version-lock theme assets in `package.json` if pulled via npm (currently using public assets).

## Migration Plan

**Implementation Steps:**
1. Create component folder structure: `src/components/layout/` and `src/components/layout/menus/`
2. Implement `Header.tsx` with logo, sidebar toggle, and user profile placeholder
3. Implement `Sidebar.tsx` with collapsible behavior and navigation rendering
4. Implement `MainMenu.tsx` with initial menu items (e.g., Dashboard, Events)
5. Implement `MainContent.tsx` as a wrapper for `<Outlet />` (React Router)
6. Implement `Footer.tsx` with copyright/version text
7. Update `App.tsx` to compose the layout and wrap routes
8. Test responsive behavior on desktop and mobile viewports

**Rollback Strategy:**
- If layout breaks existing functionality, revert `App.tsx` to direct rendering
- Component-based approach allows incremental rollback (remove one component at a time)

## Open Questions

- **Q:** Should the sidebar state persist across sessions (localStorage)?
  - **A:** Defer to future iteration based on user feedback.

- **Q:** What exact menu items should appear initially?
  - **A:** Start with "Events", expand as features are added.

- **Q:** Should the footer be sticky or static?
  - **A:** Follow Vristo theme default. Typically static at page bottom.
