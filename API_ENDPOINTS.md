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
- **Response Body:**
  ```json
  {
    "status": "Ok",
    "message": "User logged successfully.",
    "user": {
      "id": "",
      "username":"",
      "email": "",
      "token": ""
    }
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
## User Profile Endpoints

### Get Data

- **Endpoint:** `/api/v1/user/:id`
- **Method:** `GET`
- **Request Body:** `Not Required`

**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "Ok",
    "message": "Data fetched.",
    "user": {
        "_id": "",
        "username": "",
        "email": "",
        "animeList": "",
        "gameList": "",
        "movieList": "",
        "profileImg": ""
    }
  }
  ```

**Error Responses:**

1. **Invalid token:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "Unauthorized: Invalid or expired token"
     }
     ```
2. **User not found**
   - **Status Code:** `404 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "User not found"
     }
     ```

### Update Profile

- **Endpoint:** `/api/v1/user/profile`
- **Method:** `PATCH`
- **Request Body:** `Send the ones to be updated`
  ```json
    {
      "username": "",
      "email": "",
      "profileImg": "(file)"
    }
    ```
**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "Ok",
    "message": "Profile updated successfully",
    "user": {
        "_id": "",
        "username": "",
        "email": "",
        "animeList": "",
        "gameList": "",
        "movieList": "",
        "profileImg": ""
    }
  }
  ```

**Error Responses:**

1. **Invalid token:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "Unauthorized: Invalid or expired token"
     }
     ```

2. **File is not image:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "Only image files are allowed!"
     }
     ```

3. **User not found**
   - **Status Code:** `404 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "User not found"
     }
     ```

4. **File could not be uploaded**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "Image upload failed"
     }
     ```

### Anime List EndPoints

- **Endpoint:** `/api/v1/lists/anime/add`
- **Method:** `POST`
- **Request Body:** 
  ```json
    {
    "publicDbId": "string",
    "status": "string",
    "rating": "number"
    }
    ```
**Success Response:**
- **Status Code:** `201 created`
- **Response Body:**
  ```json
    {
    "status": "OK",
    "message": "Anime added successfully to the list.",
    "data": {
        "publicDbId": "string",
        "status": "string",
        "rating": "number"
    }
    }
  ```

**Error Responses:**

 **Anime Already Exists in the List:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
    "status": "error",
    "error": "Anime already exists in the list."
    }
     ```

### Game List EndPoints

- **Endpoint:** `/api/v1/lists/games/add`
- **Method:** `POST`
- **Request Body:** 
  ```json
    {
    "publicDbId": "string",
    "status": "string",
    "rating": "number"
    }
    ```
**Success Response:**
- **Status Code:** `201 created`
- **Response Body:**
  ```json
    {
    "status": "OK",
    "message": "Game added successfully to the list.",
    "data": {
        "publicDbId": "string",
        "status": "string",
        "rating": "number"
    }
    }
  ```

**Error Responses:**

 **Game Already Exists in the List:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
    "status": "error",
    "error": "Game already exists in the list."
    }
     ```

### Movie List EndPoints

- **Endpoint:** `/api/v1/lists/movies/add`
- **Method:** `POST`
- **Request Body:** 
  ```json
    {
    "publicDbId": "string",
    "status": "string",
    "rating": "number"
    }
    ```
**Success Response:**
- **Status Code:** `201 created`
- **Response Body:**
  ```json
    {
    "status": "OK",
    "message": "Movie added successfully to the list.",
    "data": {
        "publicDbId": "string",
        "status": "string",
        "rating": "number"
    }
    }
  ```

**Error Responses:**

 **Movie Already Exists in the List:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
    "status": "error",
    "error": "Movie already exists in the list."
    }
     ```
