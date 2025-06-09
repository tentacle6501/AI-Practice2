# AI-Practice2 🚀

A modern, production-ready **Node.js/TypeScript REST API** built with Express, PostgreSQL, and Prisma ORM. Features JWT authentication, comprehensive user management, and Docker containerization.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 📋 Table of Contents

- [AI-Practice2 🚀](#ai-practice2-)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠️ Technology Stack](#️-technology-stack)
  - [📋 Prerequisites](#-prerequisites)
  - [🚀 Quick Start](#-quick-start)
    - [Using Docker (Recommended)](#using-docker-recommended)
    - [Local Development](#local-development)
  - [📚 API Documentation](#-api-documentation)
    - [Base URL](#base-url)
    - [Authentication Endpoints](#authentication-endpoints)
      - [Register User](#register-user)
      - [Login User](#login-user)
    - [User Management Endpoints](#user-management-endpoints)
      - [Get All Users](#get-all-users)
      - [Get User by ID](#get-user-by-id)
      - [Create User](#create-user)
      - [Update User](#update-user)
      - [Delete User](#delete-user)
    - [Health Check](#health-check)
      - [Application Health](#application-health)
  - [🔧 Environment Variables](#-environment-variables)
  - [💻 Development](#-development)
    - [Available Scripts](#available-scripts)
    - [Database Operations](#database-operations)
  - [🧪 Testing](#-testing)
    - [Test Examples](#test-examples)
  - [🐳 Docker Setup](#-docker-setup)
    - [Development with Docker](#development-with-docker)
    - [Production Deployment](#production-deployment)
  - [📁 Project Structure](#-project-structure)
  - [🔒 Security Features](#-security-features)
  - [🚀 Performance Features](#-performance-features)
  - [📊 Monitoring](#-monitoring)
  - [🤝 Contributing](#-contributing)
    - [Development Guidelines](#development-guidelines)
  - [📜 License](#-license)
  - [🆘 Support](#-support)
  - [🎯 Next Steps](#-next-steps)

## ✨ Features

- **🔐 JWT Authentication** - Secure user registration and login
- **👥 User Management** - Complete CRUD operations for users
- **🗄️ PostgreSQL Database** - Robust data persistence with Prisma ORM
- **🔒 Security** - Password hashing, input validation, and SQL injection protection
- **🐳 Docker Ready** - Multi-stage Docker builds with health checks
- **📝 TypeScript** - Full type safety with ES modules support
- **🧪 Testing** - Jest testing framework with Supertest
- **📊 Health Monitoring** - Built-in health check endpoints
- **🔄 Auto-Migration** - Database migrations and seeding

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js 20 (LTS) |
| **Language** | TypeScript with ES Modules |
| **Framework** | Express.js |
| **Database** | PostgreSQL 14 |
| **ORM** | Prisma 5.22.0 |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcrypt |
| **Validation** | Zod schemas |
| **Testing** | Jest + Supertest |
| **Containerization** | Docker + Docker Compose |

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **PostgreSQL** (if running without Docker)

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd AI-Practice2
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the application**

   ```bash
   docker compose up --build
   ```

4. **Test the API**

   ```bash
   curl http://localhost:3000/api/health
   ```

### Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up the database**

   ```bash
   # Start PostgreSQL (if not using Docker)
   npx prisma migrate deploy
   npx prisma db seed
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Base URL

``` url
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### User Management Endpoints

#### Get All Users

```http
GET /api/users
```

#### Get User by ID

```http
GET /api/users/:id
```

#### Create User

```http
POST /api/users
Content-Type: application/json

{
  "name": "Jane Doe",
  "username": "janedoe",
  "email": "jane@example.com",
  "password": "password123"
}
```

#### Update User

```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

#### Delete User

```http
DELETE /api/users/:id
```

### Health Check

#### Application Health

```http
GET /api/health
```

**Response:**

```json
{
  "status": "ok"
}
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Application Configuration
PORT=3000
NODE_ENV=development
```

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the TypeScript project |
| `npm start` | Start production server |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

### Database Operations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Examples

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "username": "testuser", "email": "test@example.com", "password": "password123"}'

# Test user login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

## 🐳 Docker Setup

### Development with Docker

```bash
# Build and start services
docker compose up --build

# View logs
docker compose logs -f app

# Stop services
docker compose down

# Clean rebuild
docker compose down -v
docker compose up --build --no-cache
```

### Production Deployment

```bash
# Build production image
docker build -t ai-practice2:latest .

# Run production container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-production-db-url" \
  -e JWT_SECRET="your-production-jwt-secret" \
  ai-practice2:latest
```

## 📁 Project Structure

``` sh
AI-Practice2/
├── src/
│   ├── api/
│   │   ├── auth/           # Authentication routes and logic
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   ├── users/          # User management
│   │   │   ├── user.controller.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.validation.ts
│   │   └── shared/         # Shared utilities
│   │       └── asyncHandler.ts
│   └── index.ts           # Application entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts           # Database seeding
│   └── migrations/       # Database migrations
├── tests/                # Test files
├── scripts/              # Deployment scripts
├── docker-compose.yml    # Docker services configuration
├── Dockerfile           # Docker image definition
├── package.json         # Node.js dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Zod schema validation for all endpoints
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Environment Variables**: Sensitive data stored in environment variables
- **Health Checks**: Container and application health monitoring

## 🚀 Performance Features

- **Multi-stage Docker Builds**: Optimized container images
- **Database Connection Pooling**: Efficient database connections via Prisma
- **TypeScript Compilation**: Optimized JavaScript output
- **Health Monitoring**: Built-in health checks for monitoring
- **Graceful Shutdown**: Proper application shutdown handling

## 📊 Monitoring

The application includes built-in monitoring capabilities:

- **Health Check Endpoint**: `/api/health`
- **Docker Health Checks**: Container-level health monitoring
- **Database Connection Monitoring**: Automatic connection health checks
- **Application Logs**: Structured logging for debugging

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Update documentation as needed
- Ensure Docker builds successfully

## 📜 License

This project is licensed under the ISC License. See the `package.json` file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Review the [API Documentation](#-api-documentation)
3. Verify your [Environment Variables](#-environment-variables)
4. Test with the provided [curl examples](#-testing)

## 🎯 Next Steps

- [ ] Add API rate limiting
- [ ] Implement CORS configuration
- [ ] Add comprehensive logging
- [ ] Set up CI/CD pipeline
- [ ] Add API documentation with Swagger
- [ ] Implement caching layer
- [ ] Add monitoring and alerting
