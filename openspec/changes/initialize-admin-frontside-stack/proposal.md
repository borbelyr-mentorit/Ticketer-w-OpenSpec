## Why

The project currently has folder structure for Admin and Frontside applications but lacks the foundational backend and frontend implementations. We need to initialize both Node.js backends and React.js frontends to establish the dual-architecture pattern before any feature development can begin.

## What Changes

- Initialize Node.js backend for Admin application with Express server
- Initialize React.js frontend for Admin application with VRisto theme integration
- Initialize Node.js backend for Frontside application with Express server
- Initialize React.js frontend for Frontside application with Evendo theme integration
- Set up SQLite database connection and initialization scripts
- Configure routing: `/admin` for Admin side, `/events` for Frontside
- Establish package.json files with required dependencies for all four components
- Prepare test infrastructure (deferred implementation per project testing strategy)

## Capabilities

### New Capabilities

- `admin-backend-server`: Node.js Express server for Admin API endpoints with SQLite database connection
- `admin-frontend-app`: React.js application with VRisto theme integration and admin routing
- `frontside-backend-server`: Node.js Express server for Frontside API endpoints with SQLite database connection
- `frontside-frontend-app`: React.js application with Evendo theme integration and event browsing capabilities
- `database-initialization`: SQLite database setup with table schemas for Events, TicketTypes, and SoldTickets

### Modified Capabilities

<!-- No existing capabilities being modified - this is initial setup -->

## Impact

**Admin Side:**
- `/Admin/backend/`: New Node.js server code, package.json, database connection
- `/Admin/frontend/`: New React app structure, VRisto theme assets, routing configuration

**Frontside Side:**
- `/Frontside/backend/`: New Node.js server code, package.json, database connection
- `/Frontside/frontend/`: New React app structure, Evendo theme assets, routing configuration

**Shared Infrastructure:**
- `/database/`: Database initialization scripts, schema definitions
- Root-level configuration for SQLite file location (Ticketer.db.sqlite)

**Dependencies:**
- express, sqlite3, cors (backend)
- react, react-dom, react-router-dom (frontend)
- Theme-specific assets from VRisto and Evendo
