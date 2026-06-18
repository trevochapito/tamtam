# Setup Guide for TamTam

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

## Installation

### Option 1: Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/trevochapito/tamtam.git
cd tamtam
```

2. Start all services:
```bash
docker-compose up -d
```

3. Wait for all containers to be healthy:
```bash
docker-compose ps
```

### Option 2: Local Setup

#### Backend

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start PostgreSQL, MongoDB, and Redis locally.

5. Run database migrations:
```bash
npm run migrate
```

6. Seed sample data:
```bash
npm run seed
```

7. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

#### Mobile

1. Navigate to mobile:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start Expo:
```bash
npm start
```

4. Choose platform (iOS/Android/Web):
   - iOS: Press `i`
   - Android: Press `a`
   - Web: Press `w`

## Testing

### Test Login

Default test credentials:
- Email: `buyer@example.com`
- Password: `password123`

Or create a new account via the signup screen.

### Test Products

1. Browse home screen for featured products
2. Search for beverages using the search tab
3. View product details and pricing tiers

### Test Orders

1. Select a product
2. Add to cart
3. Proceed to checkout
4. Enter shipping address
5. Select payment method

### Test RFQ

1. Submit an RFQ for custom quotes
2. Suppliers will receive notifications
3. Compare supplier quotes
4. Accept best quote

## Environment Variables

Key environment variables in `.env`:

```
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://user:pass@localhost:5432/tamtam_db
MONGODB_URL=mongodb://user:pass@localhost:27017/tamtam_db
REDIS_URL=redis://localhost:6379

JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

## Troubleshooting

### Backend won't connect to database

Ensure PostgreSQL is running and `.env` has correct connection string:
```bash
psql -U tamtam_user -d tamtam_db -c "SELECT 1"
```

### Mobile can't reach backend

Update `BACKEND_URL` in mobile app config:
```javascript
// mobile/config/api.js
export const API_BASE_URL = 'http://your-backend-ip:3000';
```

### Docker containers not starting

Check logs:
```bash
docker-compose logs -f backend
```

## Production Deployment

1. **Backend:** Deploy to AWS ECS, Heroku, or DigitalOcean
2. **Database:** Use AWS RDS (PostgreSQL) + AWS DocumentDB (MongoDB)
3. **Mobile:** Build with EAS and submit to App Store/Google Play
4. **Storage:** Configure AWS S3 for file uploads

## Support

For issues, please open a GitHub issue or contact the team.
