# API EndPoints

A successful response from the server will look like this:

```json
{
  "status": "OK",
  "message": "Message for the developer",
  "data": {
    "All the data from server will be here"
  }
}
```

An error response from the server will look like this:

```json
{
  "status": "error",
  "error": "Error Message for the developer",
}
```

## Authentication Endpoints

### User Login

- **Endpoint:** `/api/v1/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

**Success Response:**
- **Status Code:** `200 OK`
- **Response Headers:**
  - `auth-token`: JWT_TOKEN_STRING
- **Response Body:**
  ```json
  {
    "status": "Ok",
    "message": "User logged successfully."
  }
  ```

**Error Responses:**

1. **Insufficient Data:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "Insufficient data. Make sure to include username and password."
     }
     ```

2. **Invalid Credentials:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "Invalid username or password."
     }
     ```

3. **Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "UpdateInfo failed check console for error"
     }
     ```

**Notes:**
- The JWT token is sent in the `auth-token` header
