## 1. Project Structure Setup

- [ ] 1.1 Create `src/components/layout/` directory in Admin frontend
- [ ] 1.2 Create `src/components/layout/menus/` subdirectory

## 2. Menu Configuration

- [ ] 2.1 Create `src/components/layout/menus/MainMenu.tsx` with menu item data structure
- [ ] 2.2 Define initial menu item: Events (placeholder)
- [ ] 2.3 Export menu configuration as TypeScript interface and data array

## 3. Header Component

- [ ] 3.1 Create `src/components/layout/Header.tsx` component file
- [ ] 3.2 Implement header layout with Vristo theme classes
- [ ] 3.3 Add logo/branding area in header
- [ ] 3.4 Add sidebar toggle button with icon
- [ ] 3.5 Add user profile icon placeholder in top-right corner
- [ ] 3.6 Apply responsive styling for mobile/desktop

## 4. Sidebar Component

- [ ] 4.1 Create `src/components/layout/Sidebar.tsx` component file
- [ ] 4.2 Implement sidebar container with Vristo theme classes
- [ ] 4.3 Add props for collapsed/expanded state
- [ ] 4.4 Import and render MainMenu navigation items
- [ ] 4.5 Implement active route highlighting using React Router's `useLocation`
- [ ] 4.6 Add CSS transitions for collapse/expand animation
- [ ] 4.7 Implement mobile-responsive behavior (hidden by default on mobile)

## 5. Main Content Component

- [ ] 5.1 Create `src/components/layout/MainContent.tsx` component file
- [ ] 5.2 Implement content container with Vristo theme classes
- [ ] 5.3 Add React Router `<Outlet />` for nested route rendering
- [ ] 5.4 Apply proper spacing and padding for content area

## 6. Footer Component

- [ ] 6.1 Create `src/components/layout/Footer.tsx` component file
- [ ] 6.2 Implement footer layout with Vristo theme classes
- [ ] 6.3 Add copyright text
- [ ] 6.4 Add version information placeholder

## 7. Layout Composition

- [ ] 7.1 Create `src/components/layout/Layout.tsx` parent component
- [ ] 7.2 Implement sidebar state management (useState hook for collapsed/expanded)
- [ ] 7.3 Compose Header, Sidebar, MainContent, and Footer components
- [ ] 7.4 Pass sidebar toggle handler and state to Header and Sidebar
- [ ] 7.5 Apply responsive layout grid/flexbox structure

## 8. App Integration

- [ ] 8.1 Update `src/App.tsx` to import and use Layout component
- [ ] 8.2 Wrap React Router routes within Layout component
- [ ] 8.3 Create placeholder Events route component
- [ ] 8.4 Verify route structure works with nested Outlet rendering

## 9. Theme Integration Verification

- [ ] 9.1 Verify Vristo CSS is loaded in `public/index.html`
- [ ] 9.2 Verify Vristo JS assets are loaded in `public/index.html`
- [ ] 9.3 Test theme classes apply correctly to layout components
- [ ] 9.4 Verify no CSS conflicts with existing styles

## 10. Responsive Testing

- [ ] 10.1 Test layout on desktop viewport (1920x1080)
- [ ] 10.2 Test layout on tablet viewport (768px width)
- [ ] 10.3 Test layout on mobile viewport (375px width)
- [ ] 10.4 Verify sidebar toggle works correctly on all viewports
- [ ] 10.5 Verify sidebar is hidden by default on mobile

## 11. Navigation Testing

- [ ] 11.1 Test navigation to Events placeholder route
- [ ] 11.2 Verify active route highlighting updates correctly
- [ ] 11.3 Verify layout shell remains persistent during navigation
- [ ] 11.4 Test sidebar toggle state persists during navigation

## 12. Final Verification

- [ ] 12.1 Verify all components follow TypeScript best practices
- [ ] 12.2 Verify component structure matches design decisions
- [ ] 12.3 Verify visual consistency with `__input_data/sample_Admin_layout.png` reference
- [ ] 12.4 Build application (`npm run build`) and verify no errors
