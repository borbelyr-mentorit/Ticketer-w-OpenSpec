# Ticketer-w-OpenSpec
This is the same Ticketer web application, written with the AI support of Open Spec

### Main features:
- The website lists events with selectable ticket types. Visitors can purchase multiple tickets to the events. Admin can create, update, delete events with specific details (name, presenter, date, from/to time, descripiton). Admin can list the sold tickets and can execute actions on them (delete, set to used).
- On the Admin pages there are three menus: Events, Ticket types, Sold tickets
- The Frontside lists all available events under each other
- When user selects a ticket, it goes into a shopping cart, which can be opened and allows modifying the amount of ticket for the given event. Then user can checkout the items.
- The web app follows responsive design (support for desktop + mobile)


### I. Dual-Architecture Pattern
The system MUST maintain strict separation between Admin and Frontside applications, each with independent backend and frontend layers:
- Admin source and test files are in /Admin folder
- Admin side serves administrators at `/admin` path
- Admin pages can be accessed after login with credentials (username + password)
- Frontside source and test files are in /Frontside folder
- Frontside serves end-users at `/events` path
- Both sides implement complete backend (Node.js) + frontend (React.js) stacks
- No shared components between Admin and Frontside at initial implementation
- Each side maintains its own source and test directory structure


### II. Technology Stack Consistency
All components MUST use the standardized technology stack:
- **Backend**: Node.js for all server-side logic and APIs
- **Frontend**: React.js for all user interfaces
- **Data Storage**: Persistent storage mechanism is SQLite database file (Ticketer.db.sqlite)
- **State Management**: Browser localStorage for frontside shopping basket (frontend responsibility)
- **Styling**: External HTML themes as specified: VRisto for Admin, Evendo for Frontside
  

### III. Deferred Testing Strategy
Testing implementation follows a staged approach:
- Initial implementation focuses on core functionality WITHOUT unit tests
- Tests (both backend and frontend) are explicitly deferred to future iterations
- Test infrastructure and files MUST be prepared during setup phase
- When tests are added later, they MUST cover existing functionality comprehensively

### IV. Themed UI Implementation
Frontend implementations MUST integrate specified HTML themes:
- **Admin**: VRisto theme (https://html.vristo.sbthemes.com/analytics.html)
- **Frontside**: Evendo theme (https://pixner.net/html/evendo/main/event-list.html)
- React components MUST adapt theme markup, not replace it
- Theme assets (CSS, JS, images) MUST be properly integrated into React build process
- Maintain theme visual consistency while implementing dynamic functionality