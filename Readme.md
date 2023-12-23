
# Blogging Platform

The Blogging Platform is a robust and secure Node.js-based RESTful API designed to power a versatile blogging application. With a focus on user authentication, blog post management, and a comprehensive set of API endpoints, it provides the backbone for a feature-rich and scalable blogging system.


## Table of Contents

1. [Project Structure](#project-structure)
2. [Dependencies](#dependencies)
3. [Getting Started](#getting-started)
4. [Features](#features)

## Project Structure

```lua
Blogging Platform/
|-- node_modules/
|-- models/
|   |-- Post.js
|   |-- User.js
|-- routes/
|   |-- authRoutes.js
|   |-- postRoutes.js
|   |-- userRoutes.js
|   |-- index.js
|-- middleware/
|   |-- authenticate.js
|-- index.js
|-- package.json
|-- README.md
```
## Dependencies

- express: Web framework for Node.js
- mongoose: MongoDB object modeling tool
- bcrypt: Library for hashing passwords
- jsonwebtoken: Implementation of JSON Web Tokens
- dotenv: Loads environment variables from a .env file
- cookie-parser: Middleware for parsing cookies

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Amool-kk/Blogging-Platform.git
```

2. Install dependencies:

```bash
cd Blogging-Platform
npm install
```

3. Set up env variables.

4. Run the application:

```bash
node run dev
```
## Features

- **User Authentication**: Utilizing JWT (JSON Web Tokens) for secure user authentication, the platform ensures that user data remains confidential and interactions are protected.

    - **User Registration and Login**:
    - **Register a New User**: POST /api/auth/register
    - **User Login**: POST /api/auth/login
- **User Logout**: End the user session securely.
    - **Logout**: POST /api/user/logout

- **User Profile**: Retrieve user profile information.

    - **Profile**: GET /api/user/profile (requires authentication)

- **Blog Post Management**:

    - **Get All Blog Posts**: GET /api/post (get all public post) 
    - **Get an Individual Blog Post**: GET /api/post/:postId
    - **Create a New Blog Post**: POST /api/post (requires authentication)
    - **Update an Existing Blog Post**: PUT /api/post/:postId (requires authentication)
    - **Delete an Existing Blog Post**: DELETE /api/post/:postId (requires authentication)
    - **Get All self Blog Posts for the Authenticated User**: GET /api/user/posts (public or private, requires authentication)
    - **Share Private Blog Post via Link**: GET /api/post/:shareToken (requires authentication)
