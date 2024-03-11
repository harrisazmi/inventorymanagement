# Inventory Management System API - Backend

This Inventory Management System API provides endpoints for managing inventory items and suppliers. It allows users to perform CRUD (Create, Read, Update, Delete) operations on inventory items and suppliers.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB
- Any HTTP client or tool like Postman for testing API endpoints

## Setup

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the root directory of the project and add the following environment variables:

PORT=3001
MONGO_DB_URL=<your_mongodb_connection_url>


Replace `<your_mongodb_connection_url>` with your MongoDB connection URL.

## Running the Application

To start the server, run:
npm start

The server will start running on `http://localhost:3001` by default, or on the port specified in the `.env` file.

## API Endpoints

### Get all inventory items

- **URL:** `/api/inventory`
- **Method:** `GET`
- **Query Parameters:**
  - `sortBy`: Sort field (default: `itemName`)
  - `sortOrder`: Sort order (default: `asc`)
  - `itemName`: Filter by item name (optional)
- **Response:** Returns an array of inventory items and the total count.

### Add new inventory item

- **URL:** `/api/inventory`
- **Method:** `POST`
- **Body:** JSON object containing `itemName`, `quantity`, and `supplierId`.
- **Response:** Returns the newly added inventory item.

### Delete an inventory item

- **URL:** `/api/inventory/:id`
- **Method:** `DELETE`
- **Parameters:** `id` (Inventory item ID)
- **Response:** Returns a success message upon successful deletion.

### Update an inventory item or supplier

- **URL:** `/api/update-inventory/:id`
- **Method:** `PUT`
- **Parameters:** `id` (Inventory item ID)
- **Body:** JSON object containing updated `itemName`, `quantity`, and `supplierId`.
- **Response:** Returns the updated inventory item.

### Populate the database

- **URL:** `/api/populate-database`
- **Method:** `POST`
- **Response:** Populates the database with sample data. (Note: Implementation of this endpoint is pending.)

## Sample Requests

### Add new inventory item

```http
POST /api/inventory
Content-Type: application/json

{
  "itemName": "Sample Item",
  "quantity": 10,
  "supplierId": "supplier_id"
}
```
_______________________________

### Update an inventory item

PUT /api/update-inventory/:id
Content-Type: application/json

```json
{
  "itemName": "Updated Item",
  "quantity": 20,
  "supplierId": "supplier_id"
}
```

## Sample Response

```json
{
  "message": "Database populated successfully"
}
```
### Additional Notes
Ensure that the MongoDB server is running before starting the application.
Make sure to replace placeholders like :id and supplier_id with actual values when making requests.
Feel free to explore and use the API to manage your inventory effectively! If you encounter any issues or have questions, don't hesitate to reach out.
