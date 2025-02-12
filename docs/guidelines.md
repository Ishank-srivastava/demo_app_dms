# DMS Frontend Technical Design & Guidelines

## 1. Technology Stack

### 1.1 Core Technologies
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **API Integration**: RTK Query
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn/UI
- **Form Management**: React Hook Form with Zod validation
- **Testing**: Vitest + React Testing Library
- **Documentation**: Storybook
- **Package Manager**: pnpm (for better dependency management)

### 1.2 Key Libraries
- **File Handling**: react-pdf for PDF viewing
- **Rich Text Editor**: TipTap
- **Date Management**: date-fns
- **Charts & Visualization**: Recharts
- **Table Management**: TanStack Table
- **Authentication**: JWT with refresh token mechanism
- **Notifications**: react-hot-toast
- **Icons**: Lucide React

## 2. Repository Structure

```plaintext
dms-frontend/
├── src/
│   ├── app/                    # App-wide configurations
│   │   ├── store.ts           # Redux store setup
│   │   ├── api.ts             # API configuration
│   │   └── routes.ts          # Route definitions
│   │
│   ├── features/              # Feature-based modules
│   │   ├── auth/
│   │   ├── documents/
│   │   ├── workflows/
│   │   └── admin/
│   │
│   ├── components/            # Shared components
│   │   ├── ui/               # Basic UI components
│   │   └── common/           # Complex shared components
│   │
│   ├── hooks/                 # Custom hooks
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript types/interfaces
│   ├── assets/               # Static assets
│   └── styles/               # Global styles
│
├── public/                    # Public assets
├── tests/                    # Test configurations
├── .storybook/              # Storybook configuration
└── vite.config.ts           # Vite configuration
```

## 3. Architecture Guidelines

### 3.1 Feature-First Organization
- Organize code by features rather than types
- Each feature module should be self-contained
- Follow the structure:
  ```plaintext
  features/documents/
  ├── components/       # Feature-specific components
  ├── hooks/           # Feature-specific hooks
  ├── api/             # API slices
  ├── types/           # Feature-specific types
  └── utils/           # Feature-specific utilities
  ```

### 3.2 Component Structure
- Use functional components with TypeScript
- Follow a consistent file structure:
  ```typescript
  // Component structure
  import { FC } from 'react'
  import type { ComponentProps } from './types'

  export const MyComponent: FC<ComponentProps> = ({
    prop1,
    prop2
  }) => {
    // Component logic
    return (
      // JSX
    )
  }
  ```

### 3.3 State Management Guidelines
1. **Local State**
   - Use `useState` for component-specific state
   - Use `useReducer` for complex local state

2. **Global State**
   - Use Redux for:
     - User authentication
     - Document data
     - Workflow states
     - App configuration
   - Structure slices by feature

3. **API State**
   - Use RTK Query for all API interactions
   - Implement caching strategies
   - Handle optimistic updates

## 4. Performance Guidelines

### 4.1 Component Optimization
- Use React.memo() for expensive renders
- Implement virtualization for long lists
- Lazy load components and routes
- Use proper key props for lists

### 4.2 Code Splitting
```typescript
// Route-based code splitting
const DocumentEditor = lazy(() => import('./features/documents/DocumentEditor'))
const WorkflowManager = lazy(() => import('./features/workflows/WorkflowManager'))
```

### 4.3 Asset Optimization
- Use SVGs for icons
- Implement proper image loading strategies
- Optimize bundle size

## 5. Security Guidelines

### 5.1 Authentication
- Implement JWT with refresh token
- Store tokens securely
- Handle token expiration
- Implement rate limiting

### 5.2 Data Protection
- Sanitize all user inputs
- Implement proper CORS policies
- Use HTTPS only
- Implement Content Security Policy


## 7. Coding Standards

### 7.1 TypeScript Usage
- Use strict type checking
- Define interfaces for all props
- Use enum for constants
- Avoid any type

### 7.2 Naming Conventions
- PascalCase for components
- camelCase for functions/variables
- UPPERCASE for constants
- kebab-case for files

### 7.3 Component Guidelines
- Keep components focused and small
- Use composition over inheritance
- Implement proper error boundaries
- Use proper prop types

## 8. Development Workflow

### 8.1 Branch Strategy
- main: production code
- develop: development code
- feature/*: new features
- bugfix/*: bug fixes
- release/*: release preparations

## 9. Documentation Requirements

### 9.1 Code Documentation
- Document complex logic
- Add JSDoc comments for components
- Keep README files updated
- Document state management

### 9.2 Storybook Usage
- Create stories for all components
- Document component variations
- Include usage examples
- Add proper controls