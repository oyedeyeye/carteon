# Carteon Backend API Documentation

Welcome to the backend component of the **Carteon Smart Card** platform. This README is specifically designed to help frontend developers understand how to interface with the Carteon API. It covers the system architecture, how to run the local development server, schema definitions, and a detailed breakdown of available API endpoints.

## 🚀 Getting Started

### Prerequisites

*   **Node.js**: v22 LTS or newer.
*   **MongoDB**: A running local MongoDB instance or a remote URI.

### Installation

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Create a `.env` file in the root of the `backend/` directory and configure the following variables:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/carteon
    NODE_ENV=development
    ```
3.  **Start the server locally**:
    ```bash
    npm run dev
    ```
    *(Alternatively, build and start: `npm run build && npm start`)*

---

## 🏗 Schema Overviews

Understanding the data schema will help frontend developers structure their components correctly.

### 1. `User` (Card Owner)
*   **`email`**: String *(unique)*
*   **`fullName`**: String
*   **`phone`**: String
*   **`deliveryAddress`**: String

### 2. `Card` (The physical representation)
*   **`cardId`**: String *(Mapping to the physical NFC URL or QR code)*
*   **`userId`**: ObjectId *(Ref: User)*
*   **`cardType`**: Enum `['SMART_ONLY', 'PVC_QR_ONLY', 'COMPLETE_PACKAGE']`
*   **`status`**: Enum `['PENDING_ACTIVATION', 'ACTIVE', 'INACTIVE']`
*   **`subscription`**: Object `{ status, expiryDate, planType }` *(Pricing is per card)*
*   **`slug`**: String *(Unique string for frontend friendly routing)*

### 3. `Profile` (The digital contact card)
*   **`cardId`**: ObjectId *(Ref: Card)*
*   **`userId`**: ObjectId *(Ref: User)*
*   **`profileName`**: String *(e.g. "Personal", "Business")*
*   **`isDefault`**: Boolean
*   **`theme`**: Object `{ backgroundColor, isCustomBrandTemplate }`
*   **`identity`**: Object `{ photoUrl, logoUrl, fullName, title, company, bio }`
*   **`contactInfo`**: Object `{ phone, email, whatsapp }`
*   **`links`**: Array of Objects `[{ type, url, label, order }]`
*   **`isActive`**: Boolean

### 4. `Lead` (Contact sharing)
*   **`profileId`**: ObjectId *(Ref: Profile)*
*   **`recipientName`**: String
*   **`recipientEmail`**: String
*   **`recipientPhone`**: String
*   **`recipientCompany`**: String *(Optional)*

### 5. `Order` (Checkout)
*   **`customerData`**: Object `{ name, email, phone, address }`
*   **`items`**: Array `[{ cardType, quantity }]`
*   **`totalAmount`**: Number
*   **`paymentStatus`**: Enum `['PENDING', 'SUCCESS', 'FAILED']`

---

## 📡 API Endpoints

All public-facing API routes are prefixed with `/api/v1/`.

### 1. Health Check
*   **Endpoint:** `GET /health`
*   **Description:** Use this to verify that the backend is alive and reachable.
*   **Response:**
    ```json
    {
      "status": "ok"
    }
    ```

---

### 2. Core Profile Portal (Tap Experience)

#### Fetch Active Profile
*   **Endpoint:** `GET /api/v1/profiles/:cardId`
*   **Description:** Retrieves the profile information for a specific physical card when tapped or scanned.
*   **Query Parameters (Optional):**
    *   `profileId`: Use this to specify exactly which profile to fetch if the user has multiple active profiles. If omitted, the default active profile is served.
*   **Success Response (200 OK):**
    ```json
    {
      "status": "success",
      "data": {
        "_id": "60d5ecb8b5c9c62b3c4e5eef",
        "cardId": "60d5ecb8b5..." ,
        "profileName": "Business Profile",
        "isDefault": true,
        "theme": { "backgroundColor": "#ffffff", "isCustomBrandTemplate": false },
        "identity": { "fullName": "Jane Doe", "title": "CEO" },
        "contactInfo": { "email": "hello@example.com" },
        "links": [
            { "type": "LinkedIn", "url": "https://linkedin.com", "label": "My LinkedIn", "order": 0 }
        ],
        "isActive": true
      }
    }
    ```
*   **Error Response (404 Not Found):**
    ```json
    {
      "status": "error",
      "message": "Active profile not found for this card"
    }
    ```
*   **Error Response (400 Bad Request - Validation Failed):**
    ```json
    {
      "status": "error",
      "message": "Validation failed",
      "errors": [...]
    }
    ```

---

### *🚧 Upcoming Endpoints (Currently in Development)*
*The following endpoints are part of the roadmap and will be available soon:*

*   **Lead Capture**: `POST /api/v1/leads/:profileId` (For lead capturing when a recipient shares their contact. Sends email notification to card owner).
*   **Ordering APIs**: `POST /api/v1/orders` (For checkout integration) & `POST /api/v1/webhooks/payment` (For automated payment updates).
*   **Admin APIs**: `POST /api/v1/admin/*` (Internal dashboard for MVP manual activation flows).

Please reach out to the backend team if you encounter any unexpected behaviors or require new payload structures!
