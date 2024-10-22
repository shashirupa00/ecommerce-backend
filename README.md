# E-commerce Order Fulfillment System

A workflow-based order fulfillment system using MongoDB, Express.js, React, and Orkes Conductor. The system handles order creation and automated fulfillment processes.

## System Architecture

- Backend: Express.js (Hosted on Render)
- Database: MongoDB Atlas
- Workflow Engine: Orkes Conductor
- Frontend: React with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Orkes Conductor account

## Getting Started

### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd [repository-name]
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Start the Order Listener

The order listener is crucial as it detects new orders and initiates the workflow:

```bash
# In the backend directory
cd src/db
node orderListener.js
```

You should see:
```
Connected to MongoDB
Conductor client initialized successfully
Listening for new orders...
```

### 5. Create Orders

You can create orders using either Postman or the frontend application.

#### Option 1: Using Postman

1. Open Postman
2. Create a new POST request:
   - URL: `https://ecommerce-backend-b0af.onrender.com/api/orders`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "customerId": "64c2fc801c2f8b4f68b2ef65",
       "items": [
         {
           "productId": "64c2fc901c2f8b4f68b2ef66",
           "quantity": 2,
           "price": 79.99
         }
       ],
       "totalAmount": 159.98,
       "shippingAddress": {
         "street": "123 Main St",
         "city": "Chicago",
         "state": "IL",
         "zipCode": "60616",
         "country": "USA"
       }
     }
     ```

#### Option 2: Using Frontend Application

1. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

2. Create an order through the UI:
   - Browse products
   - Add items to cart
   - Fill shipping information
   - Submit order

### 6. Monitor Workflow

After creating an order, you should see in the order listener console:
```
New order detected: [OrderID]
Workflow started for order: [WorkflowID]
```

## API Endpoints

Base URL: `https://ecommerce-backend-b0af.onrender.com/`

### Orders

- Create Order: `POST /api/orders`
- Get Order: `GET /api/orders/:id`
- Update Order Status: `PATCH /api/orders/:id/status`
- Process Payment: `POST /api/orders/:id/process-payment`

## Example Order Creation

```javascript
// Example order payload
const orderPayload = {
  "customerId": "64c2fc801c2f8b4f68b2ef65",
  "items": [
    {
      "productId": "64c2fc901c2f8b4f68b2ef66",
      "quantity": 2,
      "price": 79.99
    }
  ],
  "totalAmount": 159.98,
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Chicago",
    "state": "IL",
    "zipCode": "60616",
    "country": "USA"
  }
};
```

## Workflow Process

1. Create order (Frontend/Postman)
2. Order listener detects new order
3. Conductor workflow starts automatically
4. Workflow executes:
   - Get order details
   - Process payment
   - Update order status

## Notes

- The backend is hosted on Render: `https://ecommerce-backend-b0af.onrender.com/`
- Frontend runs locally on `http://localhost:3000`
- Order listener must be running to initiate workflows
