# Basic Authentication with NestJS, MongoDB, and JWT

This repository demonstrates a simple implementation of basic authentication using NestJS, MongoDB, and JWT (JSON Web Token). It provides two endpoints: `/register` for user registration and `/login` for user login.

## Technologies Used

- **NestJS:** A powerful Node.js web framework for building scalable and maintainable server-side applications.

- **MongoDB:** A NoSQL database for storing user information.

- **JWT (JSON Web Token):** A standard for creating tokens that can be sent via HTTP requests, providing a secure and compact way to transmit information.

## Author

**Hammed Tosin**

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or accessible remotely.

### Installation

 **Clone the repository:**

   ```bash
   git clone https://github.com/Toeseen188/basic_auth.git

   
   ```bash
   cd basic-authentication
   npm install

  ```bash
  npm run start

The application will be running at http://localhost:3000.

### Endpoint

## `/register`

- **Method:** `POST`
- **Description:** Register a new user with a unique username and password.
- **Request Body:**

  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }

- **Response:**
 - 201 Created: User registered successfully.
 - 400 Bad Request: User with the same username already exists.

## `/login`

- **Method:** `POST`
- **Description:** Authenticate and log in an existing user.
- **Request Body:**

  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }

- **Response:**
 - 200 OK: Login successful. Access token is included in the response.
 - 401 Unauthorized: Wrong credentials.

