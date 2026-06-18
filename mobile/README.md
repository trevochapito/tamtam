# TamTam Mobile App

Minimalist B2B/B2C beverage marketplace mobile frontend built with React Native + Expo.

## 📱 Features

- 🏠 Clean home screen with product showcase
- 🔍 Advanced search with filters
- 🛒 Shopping cart with tiered pricing
- 💬 Real-time in-app messaging
- 👤 User profile management
- 🎨 Minimalist white/red color scheme

## 🚀 Getting Started

```bash
cd mobile
npm install
npm start
```

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

### Run on Web
```bash
npm run web
```

## 📁 Structure

```
mobile/
├── App.js                 # Main app navigation
├── screens/               # All screen components
│   ├── HomeScreen.js
│   ├── SearchScreen.js
│   ├── CartScreen.js
│   ├── ChatScreen.js
│   ├── ProfileScreen.js
│   └── LoginScreen.js
├── components/            # Reusable components
├── services/              # API calls & utilities
└── package.json
```

## 🎨 Design System

- Primary Color: #D32F2F (Crimson Red)
- Background: #FFFFFF (White)
- Secondary Background: #F9F9F9 (Off-white)
- Text: #1A1A1A (Deep Charcoal)
- Secondary Text: #757575 (Muted Gray)

## 🔗 API Integration

Backend API runs on `http://localhost:3000`. Ensure backend is running before testing login/signup.
