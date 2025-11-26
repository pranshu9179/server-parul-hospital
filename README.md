sourabhbadgaiya2: Update the existing `README.md` file to include documentation for the following endpoints:

## Base URL

```
https://parul-hospital.onrender.com/api
```

---

## Appointment Routes

### 1. Create Appointment

**POST** `/api/appointments/`

- **Purpose:** Create a new appointment.
- **Required Body:**
  ```json
  {
    "name": "Patient Name",
    "phone": "1234567890",
    "date": "2025-07-10",
    "time": "10:00 AM",
    "doctor": "Dr. Smith",
    "department": "Cardiology",
    "message": "Optional message"
  }
  ```
- **Response:**
  - `201 Created`
    ```json
    {
      "_id": "appointmentId",
      "name": "Patient Name",
      "phone": "1234567890",
      "date": "2025-07-10",
      "time": "10:00 AM",
      "doctor": "Dr. Smith",
      "department": "Cardiology",
      "message": "Optional message"
    }
    ```
  - `400 Bad Request`
    ```json
    { "message": "You already have an appointment on this date." }
    ```

---

### 2. Get All Appointments

**GET** `/api/appointments/`

- **Purpose:** Get a list of all appointments.
- **Response:**
  - `200 OK`
    ```json
    [
      {
        "_id": "appointmentId",
        "name": "Patient Name",
        "phone": "1234567890",
        "date": "2025-07-10",
        "time": "10:00 AM",
        "doctor": "Dr. Smith",
        "department": "Cardiology",
        "message": "Optional message"
      },
      ...
    ]
    ```

---

### 3. Get Appointment by ID

**GET** `/api/appointments/:id`

- **Purpose:** Get appointment details by ID.
- **URL Param:** `id` (appointment ID)
- **Response:**
  - `200 OK`
    ```json
    {
      "_id": "appointmentId",
      "name": "Patient Name",
      ...
    }
    ```
  - `404 Not Found`
    ```json
    { "message": "Appointment not found" }
    ```

---

### 4. Update Appointment

**PUT** `/api/appointments/:id`

- **Purpose:** Update an existing appointment by ID.
- **URL Param:** `id` (appointment ID)
- **Required Body:** Fields to update (e.g., `date`, `time`, etc.)
- **Response:**
  - `200 OK` (updated appointment object)
  - `400 Bad Request` or `404 Not Found`

---

### 5. Delete Appointment

**DELETE** `/api/appointments/:id`

- **Purpose:** Delete an appointment by ID.
- **URL Param:** `id` (appointment ID)
- **Response:**
  - `200 OK`
    ```json
    { "message": "Appointment deleted" }
    ```
  - `404 Not Found`
    ```json
    { "message": "Appointment not found" }
    ```

---

## User Routes

> **Note:** The actual route prefix is `/api/user/` in the code, but the documentation uses `/api/users/` for clarity. Adjust according to your implementation.

### 1. Register User

**POST** `/api/users/register`

- **Purpose:** Register a new user.
- **Required Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `201 Created`
    ```json
    {
      "message": "Register Successfully",
      "user": {
        "_id": "userId",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "User"
      }
    }
    ```
  - `400 Bad Request` or `409 Conflict`
    ```json
    { "message": "User Already Exists" }
    ```

---

### 2. Login User

**POST** `/api/users/login`

- **Purpose:** Log in a user and return auth token.
- **Required Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `200 OK`
    ```json
    {
      "success": true,
      "message": "Login successful",
      "user": {
        "_id": "userId",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "User"
      },
      "token": "<jwt-token>"
    }
    ```
  - `401 Unauthorized`
    ```json
    { "message": "Invalid credentials" }
    ```

---

### 3. Logout User

**GET** `/api/users/logout`

- **Purpose:** Logout the authenticated user.
- **Middleware:** `isAuthenticated`
- **Response:**
  - `200 OK`
    ```json
    {
      "success": true,
      "message": "Logout successful"
    }
    ```

---

### 4. Get Current User

**GET** `/api/users/me`

- **Purpose:** Get current logged-in user info.
- **Middleware:** `isAuthenticated`
- **Response:**
  - `200 OK`
    ```json
    {
      "message": "fetch Successfully",
      "user": {
        "_id": "userId",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "User"
      }
    }
    ```
  - `401 Unauthorized`

---

### 5. Get All Users (Admin Only)

**GET** `/api/users/all-user`

- **Purpose:** Fetch all users (Admin only).
- **Middleware:** `isAuthenticated`, `isAdmin`
- **Response:**
  - `200 OK`
    ```json
    {
      "message": "fetch Successfully",
      "user": [
        {
          "_id": "userId",
          "name": "John Doe",
          "email": "john@example.com",
          "role": "User"
        },
        ...
      ]
    }
    ```
  - `403 Forbidden`
    ```json
    { "message": "Forbidden: Admins only" }
    ```

---

### 6. Admin Update Password

**PUT** `/api/users/update-password`

- **Purpose:** Admin can update their password.
- **Middleware:** `isAuthenticated`, `isAdmin`
- **Required Body:**
  ```json
  {
    "userId": "userId",
    "newPassword": "newpassword",
    "oldPassword": "oldpassword" // required if admin is changing their own password
  }
  ```
- **Response:**
  - `200 OK`
    ```json
    {
      "success": true,
      "message": "Password updated successfully for yourself"
    }
    ```
  - `400 Bad Request`
    ```json
    { "message": "Old password is incorrect" }
    ```

---

### 7. Admin Update User

**PUT** `/api/users/:id`

- **Purpose:** Admin updates user details by ID.
- **URL Param:** `id` (user ID)
- **Middleware:** `isAuthenticated`, `isAdmin`
- **Required Body:** Fields to update (e.g., `name`, `email`, `role`)
- **Response:**
  - `200 OK`
    ```json
    {
      "message": "Update Successfully",
      "user": {
        "_id": "userId",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "User"
      }
    }
    ```
  - `404 Not Found`
    ```json
    { "message": "User Not found" }
    ```

---

## Inquiry Routes

### 1. Create Inquiry

**POST** `/api/inquiries/`

- **Purpose:** Submit a new inquiry.
- **Required Body:**
  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "email": "john@example.com",
    "message": "I have a question about cardiology.",
    "department": "cardiology", // or "orthopedics", "pediatrics", ""
    "requestCallback": true,
    "callbackTime": "2025-07-14T10:00:00.000Z"
  }
  ```
- **Response:**
  - `201 Created`
    ```json
    {
      "_id": "inquiryId",
      "name": "John Doe",
      "phone": "1234567890",
      "email": "john@example.com",
      "message": "I have a question about cardiology.",
      "department": "cardiology",
      "requestCallback": true,
      "callbackTime": "2025-07-14T10:00:00.000Z",
      "createdAt": "2025-07-14T09:00:00.000Z",
      "updatedAt": "2025-07-14T09:00:00.000Z",
      "__v": 0
    }
    ```
  - `400 Bad Request`
    ```json
    { "message": "Validation error message" }
    ```

---

### 2. Get All Inquiries

**GET** `/api/inquiries/`

- **Purpose:** Get a list of all inquiries.
- **Response:**
  - `200 OK`
    ```json
    [
      {
        "_id": "inquiryId",
        "name": "John Doe",
        "phone": "1234567890",
        "email": "john@example.com",
        "message": "I have a question about cardiology.",
        "department": "cardiology",
        "requestCallback": true,
        "callbackTime": "2025-07-14T10:00:00.000Z",
        "createdAt": "2025-07-14T09:00:00.000Z",
        "updatedAt": "2025-07-14T09:00:00.000Z"
      },
      ...
    ]
    ```

---

### 3. Get Inquiry by ID

**GET** `/api/inquiries/:id`

- **Purpose:** Get inquiry details by ID.
- **URL Param:** `id` (inquiry ID)
- **Response:**
  - `200 OK`
    ```json
    {
      "_id": "inquiryId",
      "name": "John Doe",
      "phone": "1234567890",
      "email": "john@example.com",
      "message": "I have a question about cardiology.",
      "department": "cardiology",
      "requestCallback": true,
      "callbackTime": "2025-07-14T10:00:00.000Z",
      "createdAt": "2025-07-14T09:00:00.000Z",
      "updatedAt": "2025-07-14T09:00:00.000Z"
    }
    ```
  - `404 Not Found`
    ```json
    { "message": "Inquiry not found" }
    ```

---

### 4. Update Inquiry

**PUT** `/api/inquiries/:id`

- **Purpose:** Update an existing inquiry by ID.
- **URL Param:** `id` (inquiry ID)
- **Required Body:** Fields to update (e.g., `message`, `department`, etc.)
- **Response:**
  - `200 OK` (updated inquiry object)
  - `400 Bad Request` or `404 Not Found`

---

### 5. Delete Inquiry

**DELETE** `/api/inquiries/:id`

- **Purpose:** Delete an inquiry by ID.
- **URL Param:** `id` (inquiry ID)
- **Response:**
  - `200 OK`
    ```json
    { "message": "Inquiry deleted successfully" }
    ```
  - `404 Not Found`
    ```json
    { "message": "Inquiry not found" }
    ```

---

## Authentication & Authorization

- Most user routes require authentication via JWT token in cookies.
- Admin-only routes require the user to have the `Admin` role.

---

## Error Handling

All errors return a JSON response with a `message` field and appropriate HTTP status code.

---

**For more details, see the source code or contact the API maintainer.**

