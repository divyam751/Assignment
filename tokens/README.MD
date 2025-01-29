# Express - JWT auth, Blacklisting and Refresh tokens

## Problem statement:

- Create an Express app with user registration, login and logout functionality.

- Implement JSON Web Tokens (JWT) for user authentication.

- Implement JWT blacklisting to prevent the use of revoked tokens.

- Implement refresh tokens to improve the user experience by allowing them to stay logged in even after their access token expires.

- Use MongoDB to store user data and JWT blacklisted tokens.

- Use bcrypt to hash user passwords before storing them in the database.

- Use dotenv to manage environment variables.

## API Endpoints

### Home Endpoint

- http://localhost:3000/api/v1/

### Getting Authorized Data

- http://localhost:3000/api/v1/data

### User Registration

- http://localhost:3000/api/v1/users/register

### User Login

- http://localhost:3000/api/v1/users/login

### Generate New Token

- http://localhost:3000/api/v1/users/token

### Blacklist Token

- http://localhost:3000/api/v1/blacklist
