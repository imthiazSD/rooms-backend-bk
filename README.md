# Real-Time Application

## Description

This is a real-time chat application built with Node.js, Express, and Sequelize. It allows users to sign up, log in, create rooms, and join or leave rooms. The application uses WebSocket for real-time communication and JWT for authentication.

## Project Structure

src/

├── app.ts # Main application file

├── config.ts # Configuration settings

├── controllers/ # Route handlers

│ ├── auth.controller.ts

│ ├── ping.controller.ts

│ ├── room.controller.ts

│ ├── userRoom.controller.ts

├── database.ts # Database connection setup

├── middlewares/ # Middleware functions

│ └── auth.middleware.ts

├── models/ # Database models

│ ├── ping.model.ts

│ ├── room.model.ts

│ ├── user.model.ts

│ └── userRoom.model.ts

├── routes/ # API routes

│ ├── auth.route.ts

│ ├── ping.route.ts

│ ├── room.route.ts

│ └── userRoom.route.ts

├── services/ # WebSocket service

│ └── websocket.service.ts

├── controllers/ # Controllers for handling requests

│ └── auth.controller.ts

└── server.ts # Server setup

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- PostgreSQL (or any other database supported by Sequelize)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imthiazSD/rooms-backend-bk.git
   cd yourproject
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```
     PORT=5000
     JWT_SECRET=your_jwt_secret
     DB_CONNECTION_URI=your_database_connection_string
     RECONNECTION_WINDOW=30000
     ```

## Running the App

1. Start the server in development mode:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. The app will be running on `http://localhost:5000`.

## API Documentation

### Authentication

#### Signup

- **Endpoint:** `POST /api/auth/signup`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "id": "user_id",
      "username": "string"
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Error signing up."
    }
    ```

#### Login

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "token": "jwt_token",
      "id": "user_id"
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "error": "Invalid credentials."
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Error logging in."
    }
    ```

### Rooms

#### Create Room

- **Endpoint:** `POST /api/rooms/create`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "id": "room_id",
      "name": "string"
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Error creating room."
    }
    ```

#### Get Rooms

- **Endpoint:** `GET /api/rooms`
- **Response:**
  - **200 OK**
    ```json
    [
      {
        "id": "room_id",
        "name": "string"
      }
    ]
    ```

### User Rooms

#### Join Room

- **Endpoint:** `POST /api/user-rooms/join`
- **Request Body:**
  ```json
  {
    "roomId": "room_id"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "User joined the room successfully"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "User or Room not found"
    }
    ```

#### Leave Room

- **Endpoint:** `POST /api/user-rooms/leave`
- **Request Body:**
  ```json
  {
    "roomId": "room_id"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "User left the room successfully"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "User or Room not found"
    }
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors and libraries that made this project possible.
