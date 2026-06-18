# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth

#### Register
```
POST /auth/register

Body:
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "userType": "buyer"
}

Response:
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "userType": "buyer"
  }
}
```

#### Login
```
POST /auth/login

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "userType": "buyer"
  }
}
```

### Products

#### Get All Products
```
GET /products?category=Wine&minPrice=5&maxPrice=20

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Premium Bordeaux Merlot 2022",
      "supplier": "Chateaux Bordeaux",
      "basePrice": 8.50,
      "minOrder": 120,
      "pricingTiers": [...],
      "rating": 4.8
    }
  ],
  "total": 1
}
```

#### Get Product by ID
```
GET /products/:id

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Premium Bordeaux Merlot 2022",
    "supplier": "Chateaux Bordeaux",
    "description": "...",
    "pricingTiers": [...]
  }
}
```

### Orders

#### Create Order
```
POST /orders

Body:
{
  "items": [
    {
      "productId": 1,
      "quantity": 120
    }
  ],
  "shippingAddress": "123 Main St, New York, NY",
  "paymentMethod": "credit_card"
}

Response:
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "orderNumber": "ORD-1718702400000",
    "status": "pending",
    "totalPrice": 1440.00
  }
}
```

#### Get Order
```
GET /orders/:id

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "orderNumber": "ORD-1718702400000",
    "status": "confirmed",
    "items": [...],
    "totalPrice": 1440.00
  }
}
```

### RFQ (Request for Quote)

#### Create RFQ
```
POST /rfq

Body:
{
  "productId": 1,
  "quantity": 5000,
  "destination": "New York, USA",
  "deliveryDate": "2024-08-31",
  "specifications": {...}
}

Response:
{
  "success": true,
  "message": "RFQ created and sent to suppliers",
  "data": {
    "id": 1,
    "rfqNumber": "RFQ-1718702400000",
    "status": "sent"
  }
}
```

#### Get RFQ
```
GET /rfq/:id

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "rfqNumber": "RFQ-1718702400000",
    "quotes": [
      {
        "supplierId": 1,
        "supplierName": "Chateaux Bordeaux",
        "unitPrice": 8.50,
        "totalPrice": 42500,
        "deliveryDays": 30,
        "validUntil": "2024-07-18"
      }
    ]
  }
}
```

### Chat

#### Get Messages
```
GET /chat/messages/:roomId?limit=50&offset=0

Response:
{
  "success": true,
  "data": [...],
  "pagination": { "limit": 50, "offset": 0 }
}
```

#### Send Message
```
POST /chat/messages

Body:
{
  "roomId": "conv-1-supplier-1",
  "senderId": 1,
  "message": "Hello, can you provide a quote?"
}

Response:
{
  "success": true,
  "message": "Message sent",
  "data": {...}
}
```

### Shipping

#### Get Shipping Quote
```
POST /shipping/quote

Body:
{
  "origin": "New York, NY",
  "destination": "Los Angeles, CA",
  "weight": 1000,
  "volume": 50
}

Response:
{
  "success": true,
  "data": {
    "methods": [
      {
        "method": "Air",
        "estimatedDays": 3,
        "cost": 500,
        "carrier": "FedEx"
      },
      {
        "method": "Sea",
        "estimatedDays": 21,
        "cost": 150,
        "carrier": "Maersk"
      }
    ]
  }
}
```
