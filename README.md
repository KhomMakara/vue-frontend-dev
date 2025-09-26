# Vue Dashboard Application

A modern dashboard application cloned from the web-portal-frontend-dev project, built with Vue 3, TypeScript, and Ant Design Vue.

## Features

### 🏗️ Architecture
- **Vue 3** with Composition API and Options API
- **TypeScript** for type safety
- **Ant Design Vue** for UI components
- **Vue Router** for navigation
- **Pinia** for state management
- **Sass/SCSS** for styling

### 📱 Layout & Navigation
- **Responsive sidebar** with collapsible menu
- **Dynamic breadcrumbs** based on current route
- **Header with notifications** and user profile
- **Tree-select search** for quick navigation
- **Multi-level menu** structure

### 📊 Pages & Components
1. **Dashboard Overview** - Statistics cards, charts, and recent activities
2. **Batch Management** - Complete CRUD operations with search and filtering
3. **User Management** - Employee management with modal forms
4. **Settings** - System configuration (placeholder)
5. **Additional pages** - User roles, reports, etc. (placeholders)

### 🔧 Features Cloned from Original
- **Search forms** with filters and validation
- **Data tables** with pagination, sorting, and row selection
- **Modal dialogs** for create/edit operations
- **Export functionality** (simulated)
- **Status badges** and color coding
- **Responsive design** for mobile and desktop
- **Static data** instead of API calls

## Project Structure

```
src/
├── assets/          # Static assets and SCSS files
├── components/      # Reusable components
├── layouts/         # Layout components
│   ├── DashboardLayout.vue
│   ├── Sidebar.vue
│   └── Wrapper.vue
├── stores/          # Pinia stores
├── views/           # Page components
│   ├── DashboardOverview.vue
│   ├── BatchList.vue
│   ├── UsersView.vue
│   └── ...
└── router/          # Vue Router configuration
```

## Getting Started

### Prerequisites
- Node.js 20.16.0+ (recommended: 20.19.0+)
- npm 10+

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Key Components

### DashboardLayout
Main layout component that includes the sidebar and wrapper components.

### Sidebar
- Dynamic menu with icons and search functionality
- Collapsible design
- Route-based active states
- Tree-select for quick navigation

### Wrapper
- Header with breadcrumbs and user actions
- Notification drawer
- Language selector
- Content area wrapper

### Data Tables
- Ant Design Table with advanced features
- Pagination, sorting, filtering
- Row selection and bulk operations
- Export functionality
- Responsive design

## Static Data

All components use static mock data instead of API calls:
- **User data** - Employee information with roles and status
- **Batch jobs** - Scheduled tasks with execution status
- **Dashboard stats** - Key metrics and activities
- **Notifications** - System alerts and messages

## Styling

The application uses:
- **Ant Design Vue** theme customization
- **Custom SCSS** for additional styling
- **Responsive breakpoints** for mobile support
- **CSS variables** for theme consistency

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- IE11+ (with polyfills)

## Development Notes

This project is a clean, modern interpretation of the original web-portal-frontend-dev application with:
- Simplified architecture without enterprise authentication
- Static data instead of backend integration
- Modern Vue 3 patterns and best practices
- TypeScript for better development experience
- Responsive design for all screen sizes

The codebase follows the same patterns and structure as the original project while being more accessible for development and demonstration purposes.
