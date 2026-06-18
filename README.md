# TamTam - B2B/B2C Beverage Marketplace

🍷 A minimalist, high-contrast Alibaba-style marketplace for global beverage sourcing and bulk ordering.

## 📋 Project Structure

```
tamtam/
├── backend/              # Node.js + Express API
├── mobile/               # React Native (Expo) Frontend
├── docs/                 # Architecture & Design Docs
├── docker-compose.yml    # Local dev environment
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- MongoDB 5+

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Mobile Frontend Setup
```bash
cd mobile
npm install
npm start
```

### Full Stack with Docker
```bash
docker-compose up -d
```

## 🎨 Design System

- **Primary Canvas:** #FFFFFF (White)
- **Secondary Canvas:** #F9F9F9 (Off-White)
- **Accent Red:** #D32F2F
- **Typography:** #1A1A1A (Deep Charcoal)
- **Secondary Text:** #757575 (Muted Gray)

## 📚 Core Features

✅ Tiered Pricing Calculator
✅ RFQ (Request for Quote) Engine
✅ In-App Supplier Chat
✅ Logistics & Freight Integration
✅ Real-Time Notifications
✅ Supplier Verification
✅ Compliance Checker

## 📖 Documentation

See `/docs` for detailed architecture, API specs, and database schemas.

## 🔄 Git Workflow

- `main` - Production ready
- `develop` - Development branch
- `feature/*` - Feature branches

## 📝 License

MIT
