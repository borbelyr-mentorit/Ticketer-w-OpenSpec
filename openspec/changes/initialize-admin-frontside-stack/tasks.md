## 1. Database Setup

- [x] 1.1 Verify database initialization script exists at /database/init.js
- [x] 1.2 Update database init script to ensure Events, TicketTypes, and SoldTickets tables with correct structure (ticketIdPrefix, maxQuantity, soldQuantity, UsedDate)
- [x] 1.3 Test database initialization runs idempotently without errors

## 2. Admin Backend - Server Setup

- [x] 2.1 Create /Admin/backend/package.json with express, sqlite3, cors, and nodemon dependencies
- [x] 2.2 Create /Admin/backend/server.js with Express server initialization on port 5001
- [x] 2.3 Add CORS configuration to allow requests from http://localhost:5002
- [x] 2.4 Add JSON body parser middleware
- [x] 2.5 Integrate database initialization on server startup
- [x] 2.6 Create GET /health endpoint returning {"status": "ok"}
- [x] 2.7 Set up /api route prefix for all API endpoints
- [x] 2.8 Add npm scripts for starting the server (start, dev)
- [x] 2.9 Create /Admin/backend/__tests__/ directory with placeholder test file

## 3. Admin Frontend - React App Setup

- [x] 3.1 Verify /Admin/frontend/package.json exists and update with react-router-dom dependency
- [x] 3.2 Configure React development server to run on port 5002 (via PORT=5002 in scripts or .env)
- [x] 3.3 Configure proxy to http://localhost:5001 for /api requests in package.json
- [x] 3.4 Update /Admin/frontend/src/App.js to set up React Router
- [x] 3.5 Create /Admin/frontend/src/__tests__/ directory with placeholder test file

## 4. Admin Frontend - VRisto Theme Integration

- [x] 4.1 Download VRisto theme assets from https://html.vristo.sbthemes.com/
- [x] 4.2 Create /Admin/frontend/public/assets/ directory
- [x] 4.3 Copy VRisto CSS files to /Admin/frontend/public/assets/css/
- [x] 4.4 Copy VRisto JavaScript files to /Admin/frontend/public/assets/js/
- [x] 4.5 Copy VRisto images to /Admin/frontend/public/assets/images/
- [x] 4.6 Update /Admin/frontend/public/index.html to reference VRisto CSS and JS files
- [x] 4.7 Verify theme styling renders correctly in browser

## 5. Frontside Backend - Server Setup

- [x] 5.1 Create /Frontside/backend/package.json with express, sqlite3, cors, and nodemon dependencies
- [x] 5.2 Create /Frontside/backend/server.js with Express server initialization on port 5003
- [x] 5.3 Add CORS configuration to allow requests from http://localhost:5004
- [x] 5.4 Add JSON body parser middleware
- [x] 5.5 Integrate database initialization on server startup
- [x] 5.6 Create GET /health endpoint returning {"status": "ok"}
- [x] 5.7 Set up /api route prefix for all API endpoints
- [x] 5.8 Add npm scripts for starting the server (start, dev)
- [x] 5.9 Create /Frontside/backend/__tests__/ directory with placeholder test file

## 6. Frontside Frontend - React App Setup

- [x] 6.1 Verify /Frontside/frontend/package.json exists and update with react-router-dom dependency
- [x] 6.2 Configure React development server to run on port 5004 (via PORT=5004 in scripts or .env)
- [x] 6.3 Configure proxy to http://localhost:5003 for /api requests in package.json
- [x] 6.4 Update /Frontside/frontend/src/App.js to set up React Router
- [x] 6.5 Create /Frontside/frontend/src/__tests__/ directory with placeholder test file

## 7. Frontside Frontend - Evendo Theme Integration

- [x] 7.1 Download Evendo theme assets from https://pixner.net/html/evendo/main/
- [x] 7.2 Create /Frontside/frontend/public/assets/ directory
- [x] 7.3 Copy Evendo CSS files to /Frontside/frontend/public/assets/css/
- [x] 7.4 Copy Evendo JavaScript files to /Frontside/frontend/public/assets/js/
- [x] 7.5 Copy Evendo images to /Frontside/frontend/public/assets/images/
- [x] 7.6 Update /Frontside/frontend/public/index.html to reference Evendo CSS and JS files
- [x] 7.7 Verify theme styling renders correctly in browser

## 8. Frontside Frontend - LocalStorage Integration

 Defer implementation to a next proposal.

## 9. Verification & Documentation

- [ ] 9.1 Test Admin backend starts successfully on port 5001 and responds to /health
- [ ] 9.2 Test Admin frontend starts successfully on port 5002 with VRisto theme visible
- [ ] 9.3 Test Frontside backend starts successfully on port 5003 and responds to /health
- [ ] 9.4 Test Frontside frontend starts successfully on port 5004 with Evendo theme visible
- [ ] 9.5 Verify database file (Ticketer.db.sqlite) is created at project root
- [ ] 9.6 Verify all four services can run simultaneously without port conflicts
- [ ] 9.7 Add README with instructions for running all services in development
- [ ] 9.8 Verify test infrastructure directories exist for all four components
