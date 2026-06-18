# TamTam Architecture

## System Overview

TamTam is a full-stack B2B/B2C beverage marketplace built with:
- **Frontend:** React Native + Expo (iOS/Android)
- **Backend:** Node.js + Express
- **Databases:** PostgreSQL (relational) + MongoDB (flexible documents)
- **Caching:** Redis
- **Real-time:** Socket.io for chat and notifications

## Core Modules

### 1. Authentication & Authorization
- JWT-based auth with refresh tokens
- Role-based access control (Buyer, Supplier, Admin)
- OAuth2 integration (Google, Apple)

### 2. Product Catalog
- Product hierarchy: Category → Supplier → SKU
- Tiered pricing by volume
- Stock management
- Supplier profiles with verification badges

### 3. Order Management
- Shopping cart with dynamic pricing
- Order workflow: Quote → Purchase → Fulfillment
- Tiered pricing calculator
- Order history and tracking

### 4. RFQ (Request for Quote) Engine
- Multi-supplier quote requests
- Quote comparison dashboard
- Automated follow-ups

### 5. In-App Messaging
- Real-time supplier chat
- Negotiation templates
- File sharing (certificates, invoices)
- Notification hub

### 6. Logistics Integration
- Shipping method selection (Sea/Air/Land)
- Real-time freight calculations
- Customs documentation preview
- Tracking integration

### 7. Payment Processing
- Credit card processing
- Mobile money (MPESA, YASS MIXX, HALOPESA, AIRTEL MONEY)
- Invoice generation
- Payment history

### 8. Admin Dashboard
- Supplier management
- Compliance monitoring
- Transaction auditing
- Analytics & reporting

## Database Schema

### PostgreSQL (Relational Data)
- Users & Authentication
- Products & Pricing Tiers
- Orders & Transactions
- Suppliers & Verification
- Logistics & Shipping

### MongoDB (Flexible Documents)
- Product specifications (flexible SKU data)
- Chat histories
- Notification logs
- Audit trails
- User preferences

## API Structure

```
GET    /api/products              # List products
GET    /api/products/:id          # Get product details
GET    /api/suppliers             # List suppliers
POST   /api/orders                # Create order
GET    /api/orders/:id            # Get order details
POST   /api/rfq                   # Create RFQ
GET    /api/quotes                # List quotes
POST   /api/chat                  # Send message
GET    /api/logistics/quote       # Get shipping quote
POST   /api/payments              # Process payment
```

## Real-Time Events (Socket.io)

- `chat:message` - New chat message
- `order:status` - Order status update
- `quote:received` - Quote notification
- `notification:new` - General notification

## Deployment

- **Frontend:** Expo EAS Build → App Store / Google Play
- **Backend:** Docker → AWS ECS / Heroku / DigitalOcean
- **Database:** AWS RDS (PostgreSQL) + AWS DocumentDB (MongoDB)
- **Caching:** AWS ElastiCache (Redis)

## Security

- HTTPS/TLS encryption
- JWT token validation
- Rate limiting
- SQL injection prevention (Parameterized queries)
- XSS protection
- CORS configuration
- Environment variable management
