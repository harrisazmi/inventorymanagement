# Inventory Management System (Full Guide)

---

- RENDER HOSTED so please assume delay around 1 to 2 minute for server to wakeup from sleep

---

# FRONTEND

## Overview

The Inventory Management System is a modern web application developed using React and Vite. It provides a user-friendly interface for performing various inventory management tasks, such as adding new items, deleting existing items, searching for items, and viewing detailed product information.

## Features

- **Add Items**: Easily add new items to the inventory with a few simple clicks.
- **Delete Items**: Remove unwanted items from the inventory effortlessly.
- **Search Functionality**: Quickly find items by searching their names.
- **Product Details**: View detailed information about selected products.
- **Pagination Support**: Navigate through large inventories with ease using pagination.

## Installation

To get started with the Inventory Management System, please start go for https://github.com/harrisazmi/inventorymanagementOnlineBE
for starting the backend api and then can continue to follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd inventory-management-system
   ```

3. **Edit the Environment Variables**:

   - Create a `.env` file in the root directory if it doesn't exist.
   - Add the following line to the `.env` file, replacing `<yourbackendhost>` with the URL of your backend API:
     ```
     VITE_BACKEND_URL = <yourbackendhost>
     ```

4. **Install Dependencies**:

   ```bash
   npm install
   ```

5. **Start the Development Server**:

- I have set up so if you are using LAN, anyone connected to the same network can use what you serve

  ```bash
  npm run dev
  ```

  The development server will start, allowing you to access the Inventory Management System locally at [http://localhost:5173](http://localhost:5173).

  If you're on a local area network (LAN), other devices connected to the same network can also access the application by using your host machine's IP address and port 3000. For example:

  ```
  http://<your-ip-address>:5173
  ```

  Replace `<your-ip-address>` with the IP address of your host machine where the development server is running. Ensure that your firewall settings allow inbound connections to port 3000 if you're hosting the application over LAN.

6. **Access the Application**:
   Open your web browser and navigate to [http://localhost:5173](http://localhost:5173) to access the Inventory Management System.

## Docker Integration

You can also run the Inventory Management System using Docker. Follow these steps to build and run the application in a Docker container:

1. **Create Dockerfile**:

   Create a `Dockerfile` in the root directory of your project with the following content:

   ```Dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5173

   CMD [ "npm", "run", "dev" ]
   ```

2. **Build Docker Image**:

   Run the following command to build the Docker image:

   ```bash
   docker build -t inventory-management-system .
   ```

3. **Run Docker Container**:

   Once the image is built, start a Docker container with the following command:

   ```bash
   docker run -p 5173:5173 -d inventory-management-system
   ```

   This command will start the Docker container in detached mode, mapping port 5173 inside the container to port 3000 on your host machine. You can now access the Inventory Management System by navigating to [http://localhost:5173](http://localhost:5173) in your web browser.

4. **Accessing the Application**:

   If you're on a local area network (LAN) and want other devices to access the application, replace `localhost` with the IP address of your host machine in the URL. Ensure that your firewall settings allow inbound connections to port 3000.

## API Integration

The Inventory Management System assumes the presence of a backend API for managing inventory. Ensure to specify the base URL of the API using the `VITE_BACKEND_URL` environment variable.

___
___
___


# Backend

This repository contains the backend code for an Inventory Management System. It's built using Node.js, Express.js, and MongoDB, providing RESTful API endpoints for managing inventory items and suppliers.

## Setup Instructions

1.  Clone the repository to your local machine:

    ```bash
    git clone <repository_url>
    ```

2.  Install dependencies:

    ```bash
    cd inventorymanagementOnlineBE
    npm install
    ```

3.  Set up environment variables:

    Create a `.env` file in the root directory and define the following variables:

    ```
    PORT=3001
    MONGO_DB_URL=<your_mongodb_connection_string>
    ```

4.  Start the server:

    ```bash
    npm run dev
    ```

5.  (Good Alternative for live server)
    Nodemon is available for local hosting, so change them in package.json for only the dev part

    ```bash

    "scripts" : {
    "dev": "nodemon index.js"
    }
    ```

    Then can Start the server.

    ```bash
    npm run dev
    ```

## Using Docker

You can also run the backend using Docker. Follow these steps:

1. Build the Docker image:

   ```bash
   docker build -t inventory-backend .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3133:3133 -d inventory-backend
   ```

This will start the backend server inside a Docker container, exposing port 3133 on your host machine.

## API Endpoints

### Inventory

- **GET /api/inventory**: Fetch all inventory items with filtering, sorting, and pagination.
- **GET /api/inventory/:id**: Get information for a specific inventory item by ID.
- **POST /api/inventory**: Add a new inventory item.
- **DELETE /api/inventory/:id**: Delete an inventory item.
- **PUT /api/update-inventory/:id**: Update an inventory item or supplier.

### Data Management

- **POST /api/remove-all-data**: Remove all data from the database.
- **POST /api/populate-database**: Populate the database with at least 1000 rows of random data.

## Schemas

- **Inventory**: Represents an inventory item with properties such as item name, quantity, and supplier.
- **Supplier**: Represents a supplier with properties like name, address, and contact information.

## More Targeted Details on API Endpoints

### Get all inventory items

- **URL:** `/api/inventory`
- **Method:** `GET`
- **Query Parameters:**
  - `sortBy`: Sort field (default: `itemName`)
  - `sortOrder`: Sort order (default: `asc`)
  - `itemName`: Filter by item name (optional)
- **Response:** Returns an array of inventory items and the total count.

### Get a specific inventory item

- **URL:** `/api/inventory/:id`
- **Method:** `GET`
- **Parameters:** `id` (Inventory item ID)
- **Response:** Returns the details of the specified inventory item.

### Add a new inventory item

- **URL:** `/api/inventory`
- **Method:** `POST`
- **Body:** JSON object containing `itemName`, `quantity`, and `supplierId`.
- **Response:** Returns the newly added inventory item.

### Update an inventory item

- **URL:** `/api/inventory/:id`
- **Method:** `PUT`
- **Parameters:** `id` (Inventory item ID)
- **Body:** JSON object containing updated `itemName`, `quantity`, and `supplierId`.
- **Response:** Returns the updated inventory item.

### Delete an inventory item

- **URL:** `/api/inventory/:id`
- **Method:** `DELETE`
- **Parameters:** `id` (Inventory item ID)
- **Response:** Returns a success message upon successful deletion.

### Populate the database with sample data

- **URL:** `/api/populate-database`
- **Method:** `POST`
- **Response:** Populates the database with sample data. (Note: Implementation of this endpoint is pending.)

### Remove all data from the database

- **URL:** `/api/remove-all-data`
- **Method:** `POST`
- **Response:** Removes all data from the database.

## Dependencies

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **Cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **Dotenv**: Module for loading environment variables from a .env file.
- **Nodemon**: Alternative for a live server

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

