# 🔧 Choppi API - Backend Service

A production-ready REST API backend for the **Choppi e-commerce platform**, built with **NestJS** and **TypeORM**. Provides comprehensive product and store management with enterprise-grade authentication, real-time cart calculations, and auto-generated API documentation.

## ✨ Key Features

### 🏪 Store & Product Management
- **Complete CRUD operations** for stores and products
- **Many-to-many relationships** between stores and products
- **Dynamic pricing** per store with inventory tracking
- **Category-based organization** for products

### 🔐 Enterprise Authentication
- **JWT-based authentication** with Passport.js
- **Password hashing** with bcrypt (salt rounds: 10)
- **Role-based access control** (Admin/User permissions)
- **Secure token management** with configurable expiration

### 🛒 Advanced Cart System
- **Real-time quote calculations** across multiple stores
- **Inventory validation** during cart operations
- **Price aggregation** with automatic subtotals
- **Session-based cart management** (no persistence)

### 📊 Data Management
- **PostgreSQL database** with TypeORM ORM
- **Automated migrations** and schema management
- **Comprehensive seeding** for development/testing
- **Advanced querying** with joins and filtering

### 📚 Developer Experience
- **Auto-generated Swagger documentation** at `/api`
- **Comprehensive error handling** with custom exceptions
- **Input validation** with class-validator decorators
- **TypeScript throughout** for type safety

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Framework** | NestJS + TypeScript | Scalable Node.js framework |
| **Database** | PostgreSQL 12+ | Relational data storage |
| **ORM** | TypeORM | Object-relational mapping |
| **Auth** | Passport.js + JWT | Authentication & authorization |
| **Validation** | class-validator | Input validation |
| **Documentation** | Swagger/OpenAPI | API documentation |
| **Hashing** | bcrypt | Password security |
| **Testing** | Jest | Unit & E2E testing |

## 📋 System Requirements

### Required Software
- **Node.js 18+** (LTS recommended)
- **PostgreSQL 12+** with UUID extension
- **npm** or **yarn** package manager

### Hardware Requirements
- **RAM**: 512MB minimum, 1GB recommended
- **Storage**: 100MB for dependencies + database
- **Network**: Internet connection for npm packages

## 🚀 Quick Start Guide

### 1. Database Preparation
```sql
-- Create database and enable UUID extension
CREATE DATABASE choppi_api;
\c choppi_api;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Environment Setup
Create `.env` file in project root:
```env
# Server Configuration
PORT=4000
NODE_ENV=development

# JWT Security Settings
JWT_SECRET_ENCRYPTION='your-super-secure-jwt-secret-key-change-in-production'
JWT_EXPIRATION_TIME='24h'

# Database Connection
POSTGRES_HOST='localhost'
POSTGRES_PORT='5432'
POSTGRES_DB='choppi_api'
POSTGRES_USER='postgres'
POSTGRES_PASSWORD='your-secure-password'
POSTGRES_SCHEMA='public'
POSTGRES_SYNCHRONIZE='true'

# Optional: Database URL (alternative to individual settings)
# DATABASE_URL='postgresql://user:password@localhost:5432/choppi_api'
```

### 3. Installation & Database Setup
```bash
# Install all dependencies
npm install

# Generate TypeScript types and build
npm run build

# Initialize database schema
npm run migration:run

# Populate with sample data
npm run seed

# Start development server with hot reload
npm run start:dev
```

### 4. Verify Installation
```bash
# API Server
curl http://localhost:4000

# Swagger Documentation
open http://localhost:4000/api

# Health Check
curl http://localhost:4000/health
```

### 5. Test Credentials
```bash
# Admin User (full access)
Email: admin@choppi.com
Password: admin123

# Regular User (read access)
Email: user@choppi.com
Password: user123
```

## 🏗️ Architecture Overview

```
choppi-api/
├── src/
│   ├── main.ts                 # 🚀 Application bootstrap
│   ├── app.module.ts           # 📦 Root module configuration
│   ├── app.controller.ts       # 🏥 Health check endpoint
│   ├── auth/                   # 🔐 Authentication module
│   │   ├── auth.controller.ts  # Login/register endpoints
│   │   ├── auth.service.ts     # JWT token management
│   │   ├── auth.module.ts      # Auth module config
│   │   ├── user.entity.ts      # User database model
│   │   ├── jwt.strategy.ts     # Passport JWT strategy
│   │   └── local-auth.guard.ts # Local auth guard
│   ├── products/               # 📦 Product management
│   │   ├── products.controller.ts # CRUD endpoints
│   │   ├── products.service.ts # Business logic
│   │   ├── products.module.ts  # Module configuration
│   │   └── product.entity.ts   # Product database model
│   ├── stores/                 # 🏪 Store management
│   │   ├── stores.controller.ts    # Store CRUD endpoints
│   │   ├── stores.service.ts       # Store business logic
│   │   ├── stores.module.ts        # Store module config
│   │   ├── store.entity.ts         # Store database model
│   │   ├── store-product.entity.ts # Many-to-many relationship
│   │   └── store-products.service.ts # Store-product operations
│   ├── cart/                   # 🛒 Cart calculations
│   │   ├── cart.controller.ts  # Quote endpoint
│   │   ├── cart.service.ts     # Price calculations
│   │   └── cart.module.ts      # Cart module config
│   ├── seeds/                  # 🌱 Database seeding
│   │   ├── users.seeder.ts     # User seed data
│   │   ├── products.seeder.ts  # Product seed data
│   │   ├── stores.seeder.ts    # Store seed data
│   │   └── store-products.seeder.ts # Relationship seed data
│   └── shared/                 # 🔧 Shared utilities
│       ├── config/
│       │   └── databases.config.ts # Database configuration
│       └── data-source.ts      # TypeORM data source
├── test/                       # 🧪 End-to-end tests
├── dist/                       # 📦 Compiled JavaScript
├── migrations/                 # 🗃️ Database migrations
├── node_modules/              # 📚 Dependencies
├── package.json               # 📋 Package configuration
├── tsconfig.json              # ⚙️ TypeScript configuration
└── .env.example              # 🔑 Environment template
```

## 🌐 REST API Endpoints

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/login` | User authentication | ❌ No |
| `POST` | `/auth/register` | User registration | ❌ No |

### 📦 Product Management

| Method | Endpoint | Description | Auth Required | Response |
|--------|----------|-------------|---------------|----------|
| `GET` | `/products` | Paginated product catalog | ❌ No | Product list with stores |
| `GET` | `/products/:id` | Product details + store availability | ❌ No | Product with store array |
| `POST` | `/products` | Create new product | ✅ JWT | Created product |
| `PUT` | `/products/:id` | Update existing product | ✅ JWT | Updated product |
| `DELETE` | `/products/:id` | Remove product | ✅ JWT | Success message |

**Query Parameters for `/products`:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `q` (string): Search query (name/description)
- `category` (string): Filter by category

### 🏪 Store Management

| Method | Endpoint | Description | Auth Required | Response |
|--------|----------|-------------|---------------|----------|
| `GET` | `/stores` | Paginated store listing | ❌ No | Store list |
| `GET` | `/stores/:id` | Store details | ❌ No | Store with basic info |
| `GET` | `/stores/:id/products` | Products in specific store | ❌ No | Store products with pricing |
| `POST` | `/stores` | Create new store | ✅ JWT | Created store |
| `PUT` | `/stores/:id` | Update store information | ✅ JWT | Updated store |
| `DELETE` | `/stores/:id` | Remove store (soft delete) | ✅ JWT | Success message |

**Query Parameters for `/stores`:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `q` (string): Search by store name

### 🛒 Shopping Cart

| Method | Endpoint | Description | Auth Required | Response |
|--------|----------|-------------|---------------|----------|
| `POST` | `/cart/quote` | Calculate cart total | ❌ No | Quote with subtotals |

**Cart Quote Request Body:**
```json
[
  {
    "storeProductId": "uuid",
    "quantity": 2
  }
]
```

**Cart Quote Response:**
```json
{
  "subtotal": 31.50,
  "items": [
    {
      "storeProductId": "uuid",
      "quantity": 2,
      "price": 15.75,
      "subtotal": 31.50,
      "product": { "id": "prod-001", "name": "Leche Entera" },
      "store": { "id": "store-001", "name": "Supermercado Central" }
    }
  ]
}
```

## 🗄️ Database Architecture

### Core Entities

#### **users** - Authentication & User Management
```sql
- id: UUID (Primary Key)
- email: VARCHAR(255) UNIQUE
- password: VARCHAR(255) HASHED
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### **products** - Product Catalog
```sql
- id: UUID (Primary Key)
- name: VARCHAR(255)
- description: TEXT
- category: VARCHAR(100)
- price: DECIMAL (optional base price)
- isActive: BOOLEAN (default: true)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### **stores** - Store Information
```sql
- id: UUID (Primary Key)
- name: VARCHAR(255)
- address: TEXT
- phone: VARCHAR(50)
- deletedAt: TIMESTAMP (soft delete)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### **store_products** - Store-Product Relationships
```sql
- id: UUID (Primary Key)
- storeId: UUID (Foreign Key → stores.id)
- productId: UUID (Foreign Key → products.id)
- price: DECIMAL (store-specific pricing)
- stock: INTEGER (inventory level)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

### Database Relationships

```
users (1) ────→ (∞) sessions (JWT tokens)
products (1) ────→ (∞) store_products (∞) ←─── (1) stores
```

### Sample Dataset (Development)

#### **📦 Products (20 items)**
- **Lácteos**: Leche, Queso, Yogurt, Mantequilla
- **Panadería**: Pan, Facturas, Tortas
- **Frutas**: Manzanas, Bananas, Naranjas, Uvas
- **Carnes**: Pollo, Carne, Pescado
- **Bebidas**: Agua, Refrescos, Café, Té

#### **🏪 Stores (3 locations)**
- **Supermercado Central**: Centro comercial, precios estándar
- **Tienda de la Esquina**: Barrio local, precios competitivos
- **Mercado Orgánico**: Productos naturales, precios premium

#### **🔗 Store-Product Relationships (35 mappings)**
- Cada producto disponible en 1-3 tiendas
- Precios únicos por combinación tienda-producto
- Niveles de inventario realistas (0-50 unidades)
- Ejemplo: "Leche Entera" cuesta $2.50 en Central, $2.30 en Esquina, $3.00 en Orgánico

## 🛠️ Development Workflow

### 🚀 Development Commands
```bash
# Core Development
npm run start:dev          # Development server with hot reload
npm run start:debug        # Debug mode with inspector
npm run build             # Production build compilation
npm run start:prod        # Production server from dist

# Database Operations
npm run migration:generate # Auto-generate migration from entity changes
npm run migration:run      # Apply pending database migrations
npm run migration:revert   # Rollback last migration
npm run migration:show     # Display migration status

# Data Management
npm run seed              # Populate database with sample data
npm run seed:run          # Execute seeders manually

# Code Quality & Testing
npm run lint              # ESLint code analysis
npm run lint:fix          # Auto-fix linting issues
npm run format            # Code formatting with Prettier
npm run test              # Unit test execution
npm run test:watch        # Watch mode testing
npm run test:cov          # Coverage report generation
npm run test:e2e          # End-to-end test suite
```

### 🔄 Development Workflow
```bash
# 1. Initial Setup
npm install
npm run migration:run
npm run seed

# 2. Development Cycle
npm run start:dev          # Terminal 1: API server
# Terminal 2: Frontend development (in choppi/ directory)

# 3. Database Changes
npm run migration:generate # After entity modifications
npm run migration:run      # Apply changes

# 4. Code Quality
npm run lint && npm run test

# 5. Production Build
npm run build
npm run start:prod
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

### Getting a Token
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

## 📊 Pagination & Filtering

### Products API
```
GET /products?page=1&limit=10&q=lacteos&category=Lácteos
```

### Stores API
```
GET /stores?page=1&limit=10&q=central
```

### Store Products API
```
GET /stores/{id}/products?page=1&limit=10&inStock=true
```

## 🛒 Cart Quote Example

```bash
curl -X POST http://localhost:5000/cart/quote \
  -H "Content-Type: application/json" \
  -d '[
    {
      "storeProductId": "store-product-uuid",
      "quantity": 2
    }
  ]'
```

Response:
```json
{
  "subtotal": 31.50,
  "items": [
    {
      "storeProductId": "store-product-uuid",
      "quantity": 2,
      "price": 15.75,
      "subtotal": 31.50,
      "product": {
        "id": "prod-001",
        "name": "Leche Entera",
        "category": "Lácteos"
      },
      "store": {
        "id": "store-001",
        "name": "Supermercado Central"
      }
    }
  ]
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

## 📚 API Documentation

Complete API documentation is available via Swagger UI at `http://localhost:5000/api` when the server is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes with tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is part of the Choppi e-commerce platform.

## 🔗 Related Projects

- [Choppi Frontend](../choppi/README.md) - Next.js frontend application
