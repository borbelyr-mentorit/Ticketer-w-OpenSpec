## Context

This is the initial foundation setup for a dual-architecture ticketing application. The project requires strict separation between Admin and Frontside applications, where each side has its own backend (Node.js/Express) and frontend (React.js). Currently, only folder structure exists - no functioning code. Both sides need to be initialized simultaneously to establish the architectural pattern from the start.

**Current State:**
- Empty folder structure: `/Admin/backend/`, `/Admin/frontend/`, `/Frontside/backend/`, `/Frontside/frontend/`
- Existing package.json files in frontend folders (React stubs from create-react-app)
- Database initialization script exists at `/database/init.js`
- No servers, no API endpoints, no theme integration

**Constraints:**
- No shared components between Admin and Frontside
- Each side must be independently deployable
- SQLite database is shared infrastructure, but accessed through separate backend instances
- Theme integration must preserve original theme assets (VRisto for Admin, Evendo for Frontside)

## Goals / Non-Goals

**Goals:**
- Establish functional Node.js/Express servers for both Admin and Frontside backends
- Initialize React applications with theme integration for both frontends
- Set up SQLite database with proper schema and connection handling
- Configure routing to serve Admin at `/admin` and Frontside at `/events`
- Prepare test infrastructure (files/folders) without implementing tests
- Enable both sides to run independently during development

**Non-Goals:**
- Implementing actual features (event CRUD, ticket purchasing, etc.) - those come later
- User authentication system - deferred to future changes
- Production deployment configuration - development setup only
- Writing tests - infrastructure only, tests explicitly deferred
- Shared component library - maintaining strict separation

## Decisions

### Decision 1: Separate Express Servers vs Single Server with Routes

**Chosen:** Two separate Express server instances (one for Admin, one for Frontside)

**Rationale:**
- Enforces architectural separation at the process level
- Each side can have different middleware, configurations, and dependencies
- Enables independent deployment, scaling, and version management
- Prevents accidental coupling through shared server state
- Clearer codebase organization matching dual-architecture requirement

**Alternative considered:** Single Express server with route prefixes (`/admin/*`, `/events/*`)
- Would work but makes separation softer and easier to violate
- Harder to enforce "no shared code" rule

### Decision 2: SQLite Connection Strategy

**Chosen:** Each backend creates its own SQLite connection to the same database file

**Rationale:**
- SQLite handles concurrent reads well
- Writes are serialized by SQLite's locking mechanism
- Development simplicity - no separate database server needed
- Matches project requirement for SQLite as persistent storage
- Both sides access same data but through their own backend logic

**Trade-off:** SQLite has write concurrency limitations, but acceptable for development and small-to-medium deployments

**Alternative considered:** Separate databases for Admin and Frontside
- Would require data sync mechanism
- Violates single source of truth principle

### Decision 3: Theme Integration Approach

**Chosen:** Copy theme assets into React public/ folder, use theme CSS/JS as-is, build React components around theme HTML

**Rationale:**
- Preserves original theme styling without modification
- React components render theme-compatible markup
- Theme assets (CSS, JS, images) served statically
- Allows theme updates without touching React code

**Implementation:**
- VRisto assets → `/Admin/frontend/public/assets/`
- Evendo assets → `/Frontside/frontend/public/assets/`
- React components use theme class names and structure

**Alternative considered:** Convert theme to React component library
- Too much upfront work for initialization phase
- Risk of losing theme fidelity

### Decision 4: Port Assignment for Development

**Chosen:**
- Admin Backend: Port 5001
- Admin Frontend: Port 3001 (React dev server)
- Frontside Backend: Port 5002
- Frontside Frontend: Port 3002 (React dev server)

**Rationale:**
- Clear separation in development environment
- Predictable URLs for testing
- No port conflicts between services
- Frontend dev servers proxy API calls to their respective backends

### Decision 5: Package.json Structure

**Chosen:** Four independent package.json files (one per backend, one per frontend)

**Rationale:**
- Each component declares only its own dependencies
- Enables independent versioning and updates
- Matches architectural separation principle
- No monorepo tooling needed for initial setup

**Location:**
- `/Admin/backend/package.json`
- `/Admin/frontend/package.json`
- `/Frontside/backend/package.json`
- `/Frontside/frontend/package.json`

### Decision 6: Database Initialization Timing

**Chosen:** Database initialized on first backend server start (idempotent script)

**Rationale:**
- Existing `/database/init.js` script creates tables if they don't exist
- Each backend can call initialization on startup
- Idempotent operations prevent errors on repeated runs
- No separate migration tool needed for initial setup

**Implementation:** Both backends import and execute `../database/init.js` on startup

### Decision 7: Test Infrastructure Without Tests

**Chosen:** Create `__tests__` folders and example test files with TODO comments

**Rationale:**
- Satisfies "prepare test infrastructure" requirement
- Signals where tests will eventually go
- Enables quick test writing in future iterations
- Follows project testing strategy (deferred but infrastructure ready)

**Structure:**
- `/Admin/backend/__tests__/`
- `/Admin/frontend/src/__tests__/`
- `/Frontside/backend/__tests__/`
- `/Frontside/frontend/src/__tests__/`

## Risks / Trade-offs

**Risk:** SQLite write concurrency limits could cause bottlenecks under load  
→ **Mitigation:** Acceptable for development; can migrate to PostgreSQL/MySQL later if needed

**Risk:** Theme assets may be large, increasing initial page load time  
→ **Mitigation:** Acceptable for initial setup; optimize with lazy loading in future iterations

**Risk:** No authentication means Admin endpoints are unprotected  
→ **Mitigation:** Acknowledged as out of scope for initialization; authentication is a separate future change

**Risk:** Running 4 separate processes in development is complex  
→ **Mitigation:** Can add npm scripts to start all services together (e.g., `npm run dev:all`)

**Risk:** Duplicate database connection code between backends  
→ **Mitigation:** Intentional duplication to maintain separation; acceptable trade-off for architectural clarity

**Trade-off:** No shared components means potential duplication (e.g., API client utilities)  
→ **Accepted:** Prioritizing strict separation over DRY principle per project requirements
