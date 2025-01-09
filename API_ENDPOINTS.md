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

### User Registration

- **Endpoint:** `/api/v1/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

**Success Response:**
- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "status": "Ok",
    "message": "Welcome to the FandomFusion Realm! Your identity has been secured. Start creating and sharing your lists today!"
  }
  ```

**Error Responses:**

1. **Insufficient Data:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
        "status": "error",
        "error": "Insufficient data. Make sure to include username, email and password."
     }
     ```

2. **Email already used:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
        "status": "error",
        "error": "A user with that email is already registered."
     }
     ```
    
3. **Username already used:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
        "status": "error",
        "error": "Given username is already used."
     }
     ```

4. **Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "status": "error",
       "error": "UpdateInfo failed check console for error"
     }
     ```

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

- **Endpoint:** `/api/v1/user/getUser/:id`
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

### Send Friend Request

- **Endpoint:** `/api/v1/user/friend-requests`
- **Method:** `POST`
- **Request Body:** `Authentication token is required`
  ```json
    {
      "recipientUserName": "<--Username-->"
    }
    ```
**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Friend request sent.",
    "friendRequest": {
        "sender": "67715b35bf4c31af89303a99",
        "recipient": "67715b3dbf4c31af89303a9d",
        "status": "pending",
        "_id": "67718d707248670961fb10a5",
        "createdAt": "2024-12-29T17:57:04.455Z",
        "updatedAt": "2024-12-29T17:57:04.455Z",
        "__v": 0
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

2. **Friend request already sent:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "message": "Friend request already sent."
     }
     ```

3. **Recipient not found**
   - **Status Code:** `404 Bad Request`
   - **Response Body:**
     ```json
     {
       "message": "Recipient not found."
     }
     ```

4. **Recipient is already a friend:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "message": "Recipient is already a friend."
     }
     ```

### Respond to a Friend Request

- **Endpoint:** `/api/v1/user/friend-requests/respond`
- **Method:** `POST`
- **Request Body:** `Authentication token is required`
  ```json
    {
      "username": "<--SenderUsername-->",
      "action": "{accept/reject} <NOTE: Anything other than accept is treated as reject>"
    }
    ```
**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Friend request {action}ed."
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

2. **Friend request not found:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "error": "Friend request not found."
     }
     ```

### Get Friend Requests

- **Endpoint:** `/api/v1/user/friend-requests`
- **Method:** `GET`
- **Request Body:** `Authentication token is required, No body`

**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "friendRequests": [
        {
            "_id": "6771901b7248670961fb10cf",
            "sender": {
                "_id": "67715b35bf4c31af89303a99",
                "username": "User1",
                "profileImg": "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
            },
            "recipient": "67715b3dbf4c31af89303a9d",
            "status": "pending",
            "createdAt": "2024-12-29T18:08:27.693Z",
            "updatedAt": "2024-12-29T18:08:27.693Z",
            "__v": 0
        }
    ]
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
     

## Chat Endpoints

### Send message

- **Endpoint:** `/api/v1/chat/send`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "recipientId": "string",
    "content" : "string"
  }
  ```

**Success Response:**
- **Status Code:** `200 Ok`
- **Response Body:**
  ```json
  {
    "message": "Message sent.",
    "chatMessage": {
        "sender": "677bc222e5768c727b1c8720",
        "recipient": "677bc265e5768c727b1c8725",
        "content": "Heyyyyyy",
        "_id": "677bdb02e9499ec4c6c76dcd",
        "createdAt": "2025-01-06T13:30:42.264Z",
        "updatedAt": "2025-01-06T13:30:42.264Z",
        "__v": 0
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

2. **Insufficient Input:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
        "message": "Recipient and content are required."
     }
     ```

3. **Invalid Recipient Id:**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
        "message": "Failed to send message.",
        "error": "ChatMessage validation failed: recipient: Cast to ObjectId failed for value \"677bcaa265e5768c727b1c8725\" (type string) at path \"recipient\" because of \"BSONError\""
     }
     ```

### Get Chat History

- **Endpoint:** `/api/v1/chat/history`
- **Method:** `POST`
- **Request Body:** `None`
- **Request query parameters:** `recipientId`

**Success Response:**
- **Status Code:** `200 Ok`
- **Response Body:**
  ```json
  {
    "messages": [
        {
            "_id": "677bdb02e9499ec4c6c76dcd",
            "sender": {
                "_id": "677bc222e5768c727b1c8720",
                "username": "Demo A",
                "profileImg": "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
            },
            "recipient": {
                "_id": "677bc265e5768c727b1c8725",
                "username": "Demo B",
                "profileImg": "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
            },
            "content": "Heyyyyyy",
            "createdAt": "2025-01-06T13:30:42.264Z",
            "updatedAt": "2025-01-06T13:30:42.264Z",
            "__v": 0
        },
        {
            "_id": "677bdc43e9499ec4c6c76dd0",
            "sender": {
                "_id": "677bc265e5768c727b1c8725",
                "username": "Demo B",
                "profileImg": "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
            },
            "recipient": {
                "_id": "677bc222e5768c727b1c8720",
                "username": "Demo A",
                "profileImg": "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
            },
            "content": "Hie, Myself demo B",
            "createdAt": "2025-01-06T13:36:03.517Z",
            "updatedAt": "2025-01-06T13:36:03.517Z",
            "__v": 0
        }
    ]
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

2. **Wrong query parameter:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
        "message": "Recipient ID is required."
     }
     ```

3. **Invalid Recipient Id:**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
        "message": "Failed to send message.",
        "error": "ChatMessage validation failed: recipient: Cast to ObjectId failed for value \"677bcaa265e5768c727b1c8725\" (type string) at path \"recipient\" because of \"BSONError\""
     }
     ```
    


## Anime List EndPoints

### Add Anime

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

1. **Anime Already Exists in the List:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "status": "error",
      "error": "Anime already exists in the list."
    }
    ```

### Update Anime

- **Endpoint:** `/api/v1/lists/anime/update/:id`
- **Method:** `PATCH`
- **Request Body:** 
  ```json
    {
      "status": "string",
      "rating": "number"
    }
  ```

**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
    {
      "message": "Anime updated successfully.",
      "data": {
          "_id": "ObjectId",
          "publicDbId": "string",
          "status": "string",
          "rating": "number",
          "__v": 0
      }
    }
  ```

**Error Responses:**

1. **Anime not found:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Invalid anime ID."
    }
    ```

2. **Invalid status value:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Invalid status value"
    }
    ```

3. **Invalid rating:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Rating must be a number between 0 and 10"
    }
    ```

### Remove Anime

- **Endpoint:** `/api/v1/lists/anime/remove/:id`
- **Method:** `DELETE`
- **Request Body:** `None`

**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
    {
      "message": "Anime removed successfully."
    }
  ```

**Error Responses:**

1. **Anime not found:**
  - **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": "Anime not found in your list."
    }
    ```


## Game List EndPoints

### Add Game

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

1. **Game Already Exists in the List:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
      "status": "error",
      "error": "Game already exists in the list."
     }
     ```
### Update Game

- **Endpoint:** `/api/v1/lists/games/update/:id`
- **Method:** `PATCH`
- **Request Body:** 
  ```json
  {
    "status": "string",
    "rating": "number"
  }
  ```
**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
    {
      "message": "Game updated successfully.",
      "data": {
          "_id": "ObjectId",
          "publicDbId": "string",
          "status": "string",
          "rating": "number",
          "__v": 0
      }
    }
  ```

**Error Responses:**

1. **Game not found:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Invalid game ID."
    }
    ```

2. **Invalid status value:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Invalid status value"
    }
    ```

3. **Invalid rating:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Rating must be a number between 0 and 10"
    }
    ```

### Remove Game

- **Endpoint:** `/api/v1/lists/games/remove/:id`
- **Method:** `DELETE`
- **Request Body:** `None`

**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
    {
      "message": "Game removed successfully."
    }
  ```

**Error Responses:**

1. **Game not found:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Game not found in your list."
    }
    ```

## Movie List EndPoints

### Add Movie

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

1. **Movie Already Exists in the List:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
      "status": "error",
      "error": "Movie already exists in the list."
     }
     ```

### Update Movie

- **Endpoint:** `/api/v1/lists/movies/update/:id`
- **Method:** `PATCH`
- **Request Body:** 
  ```json
  {
    "status": "string",
    "rating": "number"
  }
  ```
**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Movie updated successfully.",
    "data": {
        "_id": "ObjectId",
        "publicDbId": "string",
        "status": "string",
        "rating": "number",
        "__v": 0
    }
  }
  ```

**Error Responses:**

1. **Movie not found:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Invalid movie ID."
    }
    ```

2. **Invalid status value:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Invalid status value"
    }
    ```

3. **Invalid rating:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Rating must be a number between 0 and 10"
    }
    ```

### Remove Movie

- **Endpoint:** `/api/v1/lists/movies/remove/:id`
- **Method:** `DELETE`
- **Request Body:** `None`

**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Movie removed successfully."
  }
  ```

**Error Responses:**

1. **Movie not found:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Movie not found in your list."
    }
    ```

## Media EndPoints

### Search Anime
- **Endpoint:** `/api/v1/media/anime/search?q={query_string}`
- **Method:** `GET`
- **Request Body:** `Not Required` 
- **Authentication:** `Required` 

**Success Response:**
  - **Status Code:** `200 Ok`
  - **Response Body:**
    ```json
    {
      "data": [
        {
          "publicDbId": 38000,
          "imageUrl": "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
          "title_english": "Demon Slayer: Kimetsu no Yaiba",
          "title_japanese": "鬼滅の刃",
          "episodes": 26,
          "status": "Finished Airing",
          "score": 8.45,
          "synopsis": "Ever since the death of his father...",
          "rated": "R - 17+ (violence & profanity)",
          "season": "spring",
          "year": 2019,
          "type": "anime"
        }
      ]
    }
    ```

**Error Responses:**

1. **Query string/q parameter not provided or empty:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
    ```json
    {
      "error": "Query parameter `q` is required."
    }
    ```

2. **Invalid or malformed query string:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
      {
        "error": "Game already exists in the list.",
        "details": "response from JIKAN API",
      }
     ```

3. **User not authenticated**
   - **Status Code:** `401 Bad Request`
   - **Response Body:** `See User Authentication`

4. **Internal error or Invalid response from JIKAN api:**
   - **Status Code:** `500 Bad Request`
   - **Response Body:**
      ```json
      {
        "error": "Failed to fetch data from Jikan API",
        "details": "error details/fetch response"
      }
     ```
  ### Search Game
 **Endpoint:**`/api/v1/media/game/search?search={query_string}`
 - **Method:** `GET`
- **Request Body:** `None`


**Success Response:**
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
   {
  "status": "success",
  "data": [
    {
      "publicDbId": 12345,
      "title": "Game Name",
      "releasedDate": "2024-01-01",
      "imgUrl": "https://example.com/image.jpg",
      "score": 4.5,
      "genres": ["Action", "Adventure"],
      "platforms": ["PC", "PlayStation"]
    }
  ]
  }
**Error Responses:**

1. **Game not found:**
   - **Status Code:** `400 Bad Request`
   - **Response Body:**
  ```json
  {
  "status": "error",
  "message": "Invalid or missing search query."
   }
  ```

### Get Anime List
- **Endpoint:** `/api/v1/list/anime`
- **Method:** `GET`
- **Request Body:** `Not Required` 
- **Authentication:** `Required` 

**Success Response:**
  - **Status Code:** `200 Ok`
  - **Response Body:**
    ```json
    {
        "animeList": [
            {
                "publicDbId": 38000,
                "imageUrl": "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
                "title_english": "Demon Slayer: Kimetsu no Yaiba",
                "title_japanese": "鬼滅の刃",
                "episodes": 26,
                "status": "Finished Airing",
                "score": 8.45,
                "synopsis": "<---Text-->",
                "rated": "R - 17+ (violence & profanity)",
                "season": "spring",
                "year": 2019,
                "type": "anime",
                "userStatus": "Completed",
                "userRating": 9
            },
            {
                "publicDbId": 459,
                "imageUrl": "https://cdn.myanimelist.net/images/anime/1770/97704l.jpg",
                "title_english": "One Piece: The Movie",
                "title_japanese": "ONE PIECE",
                "episodes": 1,
                "status": "Finished Airing",
                "score": 7.09,
                "synopsis": "<--Text-->",
                "rated": "PG-13 - Teens 13 or older",
                "season": null,
                "year": null,
                "type": "anime",
                "userStatus": "Watching",
                "userRating": 8
            }
        ]
    }
    ```

**Error Responses:**

1. **Invalid anime in list:**
   - **Status Code:** `500 Internal server error`
   - **Response Body:**
    ```json
    {
      "message": "An error occurred while fetching the anime list.",
      "error": "Request failed with status code 404"
    }
    ```

2. **No anime list exists for user:**
   - **Status Code:** `404 Not found`
   - **Response Body:**
    ```json
    {
      "error": "No anime list found for this user."
    }
    ```

3. **User not authenticated**
   - **Status Code:** `401 Unauthorized`
   - **Response Body:**
      ```json
      {
        "message": "Unauthorized: Invalid or expired token"
      }
      ```

### 1. **Get Top Anime**
**Endpoint:**
```
GET /api/v1/media/anime/top
```

**Description:**
Fetches the top anime data from the Jikan API.

**Query Parameters:**
| Parameter | Type   | Required | Description                        |
|-----------|--------|----------|------------------------------------|
| `page`    | Number | No       | Specifies the page number (default: 1). |

**Response:**
```json
{
  "data": [
    {
      "publicDbId": 38000,
      "imageUrl": "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
      "titleEnglish": "Demon Slayer: Kimetsu no Yaiba",
      "titleJapanese": "\u9b3c\u6ec5\u306e\u5203",
      "episodes": 26,
      "status": "Finished Airing",
      "score": 8.45,
      "synopsis": "Ever since the death of his father...",
      "rated": "R - 17+ (violence & profanity)",
      "season": "spring",
      "year": 2019,
      "type": "anime",
      "rank": "12"
    }
  ]
}
```

**Error Responses:**
| Status Code | Message                  |
|-------------|--------------------------|
| 404         | "No data found"         |
| 500         | "Internal Server Error" |

**Example Request:**
```
GET /api/v1/media/anime/top?page=1
```

**Example Response:**
```json
{
  "data": [
    {
      "publicDbId": 38000,
      "imageUrl": "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
      "titleEnglish": "Demon Slayer: Kimetsu no Yaiba",
      "titleJapanese": "\u9b3c\u6ec5\u306e\u5203",
      "episodes": 26,
      "status": "Finished Airing",
      "score": 8.45,
      "synopsis": "Ever since the death of his father...",
      "rated": "R - 17+ (violence & profanity)",
      "season": "spring",
      "year": 2019,
      "type": "anime",
      "rank": "12"
    }
  ]
}
```

### Get Game Details
- **Endpoint:** `/api/v1/media/anime/details`
- **Method:** `GET`
- **Request Body:** `Not Required` 
- **Authentication:** `Required` 

**Success Response:**
  - **Status Code:** `200 Ok`
  - **Response Body:**
    ````json
    {
        "data": [
        {
        "publicDbId": 12345,
        "title": "Lamp Head",
        "releasedDate": "2015-09-29",
        "imgUrl": "https://media.rawg.io/media/screenshots/216/216f32da89f4be88f4b5a43568e1a67a.jpg",
        "score": 0,
        "genre": [
            "Adventure",
            "Casual",
            "Indie"
        ],
        "platform": [
            "PC"
        ],
        "description": "The protagonist of this game is a strange man with a lamp instead his head who needs to breach out of the darkened and dangerous odd place at whatever cost. Are you ready to prove that your reaction is outstanding, shunting between sharp barriers, collecting bonuses, remembering that in the end of every dark path the light of victory awaits?\nThe game was present on Poket Game Conference in Helsinki\non event Very Big INDIE Pitch! Top 1 in more than 20 countries on Windows Platform. Support this game and enjoy our indie game!\n* Get battery to light your way\n* Collect coins to save him!\n* Adorable sound effects\n* Challenge and help your friends!\n* Added more New Location,\n* Added more cute cartoon characters",
        "rated": "Not Rated"
  
        }
        ]
        }
        ```

   **Error Responses:**

   **Invalid Game Id:**
   - **Status Code:** `400`
   - **Response Body:**
    ```json
    {
      "status": "error",
      "message": "Invalid Id"
    }
    ```



