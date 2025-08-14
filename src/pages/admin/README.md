# Admin Section

This directory contains all the admin-related components and pages for the TinyTots e-commerce platform.

## Structure

```
src/pages/admin/
├── AdminDashboard.jsx    # Main dashboard component
├── AdminLayout.jsx      # Layout wrapper for admin pages
├── index.js             # Exports all admin components
├── users/               # User management
│   └── Users.jsx
├── products/            # Product management
│   └── Products.jsx
├── orders/              # Order management
│   └── Orders.jsx
└── settings/            # Store settings
    └── Settings.jsx
```

## Features

- **Dashboard**: Overview of store metrics and recent activity
- **Users**: Manage customer and admin accounts
- **Products**: Add, edit, and delete products
- **Orders**: View and manage customer orders
- **Settings**: Configure store preferences, shipping, payments, and email settings

## Authentication & Authorization

The admin section is protected and requires:
1. User authentication (logged in)
2. Admin role (`role: 'admin'` in user object)

Unauthenticated users will be redirected to the login page, while authenticated non-admin users will be redirected to the home page.

## API Integration

All admin pages make API calls to protected endpoints under `/api/admin/`. These endpoints require a valid JWT token with admin privileges.

## Styling

The admin interface uses a combination of:
- Styled Components for layout and theming
- React Icons for icons
- Responsive design for mobile and desktop views

## Development

To add a new admin page:

1. Create a new directory under the appropriate section (e.g., `promotions/`)
2. Create your component file (e.g., `Promotions.jsx`)
3. Add a new route in `src/routes/AdminRoutes.jsx`
4. Add a navigation link in `AdminLayout.jsx` if needed

## Environment Variables

The following environment variables are used in the admin section:

- `REACT_APP_API_URL`: Base URL for API requests
- `REACT_APP_ADMIN_EMAIL`: Default admin email (for development)

## Testing

Admin components should be tested for:
- Authentication/authorization
- Form validation
- API error handling
- Responsive behavior
