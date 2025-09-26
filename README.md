# 📦 Node.js + Express + MySQL REST API

A simple, production-ready REST API built with Node.js (ES Modules), Express, and MySQL. This project demonstrates clean architecture with controllers, routes, middleware, and connection pooling, along with Docker Compose for containerized deployment.

## 📂 Project Structure

```
node-mysql-restapi/
├─ .env                     # Environment variables
├─ Dockerfile               # Node.js app Docker image
├─ docker-compose.yml       # MySQL + Node.js services
├─ index.js                 # Express app entry
├─ db.js                    # MySQL pool connection
├─ routes/
│  └─ users.js              # Routes for users resource
├─ controllers/
│  └─ usersController.js    # CRUD logic
├─ middleware/
│  └─ errorHandler.js       # Central error handler
├─ sql/
│  └─ init.sql              # SQL to initialize DB & users table
└─ package.json             # Dependencies & scripts
```

## ⚡ Features

- **Node.js with Express.js** - Fast, unopinionated web framework
- **MySQL database integration** - Using mysql2/promise for async operations
- **RESTful CRUD API** - Complete users resource management
- **Connection pooling** - Efficient database connection management
- **Centralized error handling** - Clean error responses
- **Configurable via .env** - Environment-based configuration
- **Docker + Docker Compose support** - Containerized deployment
- **Nodemon for development** - Hot reload during development

## 🛠 Prerequisites

Make sure you have the following installed:

- **Node.js** (v18+ recommended)
- **MySQL** (or MariaDB)
- **Docker & Docker Compose** (optional but recommended)

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nodejs-mysql-restapi.git
cd nodejs-mysql-restapi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=app_user
DB_PASSWORD=app_password
DB_NAME=company_database
DB_PORT=3306
DB_CONNECTION_LIMIT=10
```

### 4. Initialize the database

Run the SQL initialization script:

```bash
mysql -u root -p < sql/init.sql
```

## 🐳 Run with Docker

### Build and start containers

```bash
docker compose up --build
```

### Services

- **App** → http://localhost:3000
- **MySQL** → localhost:3307 (root password: `rootpassword`)

### Reset containers & database

```bash
docker compose down -v
docker compose up --build
```

## 🚀 Running Locally (without Docker)

### Start in development mode (with nodemon):

```bash
npm run dev
```

### Start in production mode:

```bash
npm start
```

**API runs at:** 👉 http://localhost:3000/api/users

## 📖 API Endpoints

### Base URL

```
http://localhost:3000/api/users
```

### Endpoints

#### 1. Get all users

```http
GET /api/users
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 28,
    "created_at": "2025-09-25T12:34:56Z"
  }
]
```

#### 2. Get user by ID

```http
GET /api/users/1
```

#### 3. Create user

```http
POST /api/users
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 28
}
```

#### 4. Update user

```http
PUT /api/users/1
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Alice B",
  "age": 29
}
```

#### 5. Delete user

```http
DELETE /api/users/1
```

## 🧪 Testing with cURL

### Create a user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### Get all users

```bash
curl http://localhost:3000/api/users
```

### Get user by ID

```bash
curl http://localhost:3000/api/users/1
```

### Update a user

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "age": 31}'
```

### Delete a user

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## 🔧 Package.json Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

## 🏗️ Architecture

### Controllers

Handle business logic and database operations for each resource.

### Routes

Define API endpoints and link them to appropriate controller methods.

### Middleware

Centralized error handling and request processing.

### Database

Connection pooling with mysql2 for efficient database operations.

## 🔒 Security Considerations

For production deployment, consider adding:

- **Input validation** (express-validator or Joi)
- **Authentication** (JWT tokens)
- **Rate limiting** (express-rate-limit)
- **CORS configuration** (cors middleware)
- **Helmet.js** for security headers
- **SQL injection protection** (parameterized queries)

## 🚀 Next Steps

- [ ] Add input validation (express-validator or Joi)
- [ ] Add authentication (JWT)
- [ ] Add pagination & filtering for `GET /api/users`
- [ ] Add logging (Winston / Pino)
- [ ] Add unit tests (Jest)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add database migrations
- [ ] Add health check endpoint

## 🐛 Troubleshooting

### Common Issues

**Database connection errors:**

- Ensure MySQL is running
- Check environment variables in `.env`
- Verify database credentials

**Port already in use:**

- Change the `PORT` in `.env`
- Kill existing processes: `lsof -ti:3000 | xargs kill -9`

**Docker issues:**

- Reset containers: `docker compose down -v`
- Rebuild images: `docker compose up --build`

## 📄 License

MIT License © 2025

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using Node.js, Express, and MySQL**
