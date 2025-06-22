# TaskTracker - Task Management Application

## Overview

TaskTracker is a modern, full-stack task management application built with React and Express. The application provides an intuitive interface for creating, organizing, and tracking tasks with features like categorization, priority levels, due dates, and smart filtering. It uses a shared TypeScript schema for type safety across the frontend and backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reload with Vite middleware integration

### Development Environment
- **Platform**: Replit with Node.js 20, PostgreSQL 16 modules
- **Build System**: ESBuild for production bundling
- **Type Checking**: TypeScript with strict mode enabled
- **Package Manager**: npm

## Key Components

### Database Schema
- **Tasks Table**: Core entity with fields for title, description, category, priority, due date, completion status, and timestamps
- **Users Table**: User management with username and password fields
- **Categories**: Predefined categories (work, personal, health)
- **Priorities**: Three-tier priority system (low, medium, high)

### API Structure
- **RESTful endpoints**: CRUD operations for tasks
- **Validation**: Server-side validation using shared Zod schemas
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Logging**: Request/response logging for API endpoints

### UI Components
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Library**: Comprehensive set of reusable UI components
- **Accessibility**: Built on Radix UI primitives for accessibility compliance
- **Theming**: Light/dark mode support with CSS custom properties

## Data Flow

1. **Client Requests**: React components make API requests through TanStack Query
2. **API Layer**: Express routes handle requests and validate data using Zod schemas
3. **Data Access**: Drizzle ORM handles database operations with type safety
4. **Response**: Data flows back through the API to update React Query cache
5. **UI Updates**: Components automatically re-render with updated data

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **wouter**: Lightweight React router
- **react-hook-form**: Performant form library
- **zod**: Runtime type validation
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

- **Platform**: Replit autoscale deployment
- **Build Process**: 
  1. Frontend build using Vite (outputs to `dist/public`)
  2. Backend build using ESBuild (outputs to `dist/index.js`)
- **Runtime**: Production server runs the bundled Express application
- **Database**: Neon serverless PostgreSQL (configured via DATABASE_URL)
- **Port Configuration**: Application runs on port 5000, exposed as port 80

### Build Commands
- **Development**: `npm run dev` - Runs TypeScript server with hot reload
- **Production Build**: `npm run build` - Builds both frontend and backend
- **Production Start**: `npm run start` - Runs the production server
- **Database**: `npm run db:push` - Pushes schema changes to database

## Changelog

Changelog:
- June 22, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.