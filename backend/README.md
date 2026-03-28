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

    # SMTP Configuration
    SMTP_HOST=smtp.ethereal.email
    SMTP_PORT=587
    SMTP_SECURE=false
    SMTP_USER=ethereal_user
    SMTP_PASSWORD=ethereal_pass
    FROM_EMAIL="Carteon Alerts" <alerts@carteon.com>

    # Paystack Webhook Configuration
    PAYMENT_WEBHOOK_SECRET=your_paystack_webhook_test_secret

    # Internal MVP Scripts
    ADMIN_API_KEY=default_admin_key_for_dev
    ```
3.  **Start the server locally**:
    ```bash
    npm run dev
    ```
    *(Alternatively, build and start: `npm run build && npm start`)*

### Database Setup & Seeding
Carteon uses MongoDB for data persistence. By default, the application will attempt to connect to the URI defined in your `.env` file (e.g. `mongodb://localhost:27017/carteon_dev`).

To quickly populate your local database with mock elements for testing (such as generated executives, customized themes, connected physical cards, existing lead captures, and mock orders), run the built-in seed script:

```bash
npm run seed
```
*Note: Running `npm run seed` will completely wipe your local database collections before inserting the fresh mock data.*

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
*   **`colorVariant`**: String *(Optional - E.g. Matte Black Metal)*
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
*   **`items`**: Array `[{ cardType, quantity, colorVariant }]`
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

### 3. Lead Capture & Notifications

#### Share Contact with Card Owner
*   **Endpoint:** `POST /api/v1/leads/:profileId`
*   **Description:** Submits visitor contact details to the owner of the `profileId`. This action automatically fires an email notification containing the lead's information to the user's primary email using the subject `"New Contact from Your Carteon Card"`.
*   **Request Body:**
    ```json
    {
      "recipientName": "Interested Client",
      "recipientEmail": "client@example.com",
      "recipientPhone": "+2348012345678",
      "recipientCompany": "Optional Company Ltd"
    }
    ```
*   **Success Response (201 Created):**
    ```json
    {
      "status": "success",
      "message": "Contact shared successfully!",
      "data": { ...leadObject }
    }
    ```
*   **Error Response (400 Bad Request):** Returns missing/invalid field messages.

---

### 4. Product Catalogue

#### Fetch Available Cards
*   **Endpoint:** `GET /api/v1/products/cards`
*   **Description:** Retrieves the product catalogue. Use this to display the available card types, base pricing, and available finishes (e.g. Matte Black Metal, Gold Metal) to potential customers on the marketing frontend.
*   **Success Response (200 OK):**
    ```json
    {
      "status": "success",
      "data": [
        {
          "cardType": "SMART_ONLY",
          "slug": "carteon-smart-card",
          "name": "Carteon Smart Card",
          "description": "Premium NFC-enabled smart business card",
          "basePrice": 15000,
          "finishes": ["Matte Black Metal", "Gold Metal", "Silver Metal", "Gold mirror"]
        }
      ]
    }
    ```

---

### 5. Checkout & Ordering

#### Initialize Order
*   **Endpoint:** `POST /api/v1/orders`
*   **Description:** Creates a new order instance internally and initializes a payment session externally (Paystack).
*   **Note on Redirects:** Once initialized, the backend automatically provides a `callback_url` to the payment provider. After a successful payment, the user will be redirected back to the frontend's payment success page (`FRONTEND_PAYMENT_SUCCESS_URL` env variable, typically `/payment/success`). Ensure this frontend page displays a profile setup link in case automatic redirection logic failed or if the user needs to set up later.
*   **Request Body:**
    ```json
    {
       "customerData": {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "phone": "+2348000000000",
          "address": "Lekki Phase 1"
       },
       "items": [
          { "cardType": "SMART_ONLY", "quantity": 1, "colorVariant": "Gold Metal" }
       ],
   "totalAmount": 15000 // Verified strictly backend-side
    }
    ```
*   **Security Notice:** The `totalAmount` provided by the client is strictly validated against the server-side `ProductService` base pricing. Any discrepancies (price manipulation attempts) will result in transaction failure and explicit errors.
*   **Success Response (201 Created):**
    ```json
    {
      "status": "success",
      "message": "Order created and payment initialized",
      "data": {
        "reference": "CRT_e8a21f1d...",
        "paymentUrl": "https://checkout.paystack.com/test_url"
      }
    }
    ```

#### Webhook Reception
*   **Endpoint:** `POST /api/v1/webhooks/payment`
*   **Description:** Server-to-server webhook path. Listens for Gateway events like `charge.success` and automatically switches local DB order statuses to `SUCCESS`. Validates payloads strictly using HMAC `x-paystack-signature`.
*   **Success Response (200 OK):**
    ```json
    {
      "status": "success"
    }
    ```

---

### 6. Admin Utilities (MVP)

Note: All admin endpoints necessitate a valid `x-admin-api-key` header to operate. The default development key is `default_admin_key_for_dev`.

#### Create User
*   **Endpoint:** `POST /api/v1/admin/users`
*   **Headers:** `x-admin-api-key`
*   **Request Body:** `{ "email", "fullName", "phone", "deliveryAddress" }`
*   **Success Response (201 Created):** `{"status": "success", "data": { ...user }}`

#### Create Card
*   **Endpoint:** `POST /api/v1/admin/cards`
*   **Headers:** `x-admin-api-key`
*   **Request Body:** `{ "cardId", "userId", "cardType", "slug", "status", "subscription": { "planType" } }`
*   **Success Response (201 Created):** `{"status": "success", "data": { ...card }}`

#### Create Profile
*   **Endpoint:** `POST /api/v1/admin/profiles`
*   **Headers:** `x-admin-api-key`
*   **Request Body:** `{ "userId", "cardId", "profileName", "isDefault", "theme", "identity", "contactInfo", "links", "isActive" }`
*   **Note:** The Admin payload schema strictly parses incoming data. Any undocumented keys submitted in `theme` or `contactInfo` will result in a Validation Error to prevent NoSQL injection and Object pollution.
*   **Success Response (201 Created):** `{"status": "success", "data": { ...profile }}`

---

## 🛡 Security Characteristics
The backend implements strict validation mapping aligned to OWASP Top 10 guidelines:
* **Global Error Wrapping**: Express explicitly catches all JSON `SyntaxError`s and controller limits to provide graceful, stack-free `400`/`500` JSON shapes.
* **TDD Idempotency / Race Condition Prevention**: Database writes utilize unique MongoDB locks (`findOneAndUpdate` with `$ne`) ensuring repetitive webhook signals never double-process.
* **XSS Mitigation**: User strings entering outbound HTML services (e.g. Lead Contacts mapped into Notification emails) traverse strict entity encoding utilities. 

---

Please reach out to the backend team if you encounter any unexpected behaviors or require new payload structures!
