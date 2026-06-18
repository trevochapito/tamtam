const express = require('express');
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  const { category, minPrice, maxPrice, supplier } = req.query;

  // TODO: Query database with filters
  const products = [
    {
      id: '1',
      name: 'Premium Bordeaux Merlot 2022',
      supplier: 'Chateaux Bordeaux',
      category: 'Wine & Spirits',
      basePrice: 8.50,
      minOrder: 120,
      pricingTiers: [
        { quantity: 100, price: 12.00 },
        { quantity: 501, price: 10.50 },
        { quantity: 2001, price: 8.50 }
      ],
      stock: 5000,
      rating: 4.8,
      reviews: 342
    }
  ];

  res.status(200).json({
    success: true,
    data: products,
    total: products.length
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // TODO: Query database for specific product
  const product = {
    id,
    name: 'Premium Bordeaux Merlot 2022',
    supplier: 'Chateaux Bordeaux',
    description: 'Premium French wine from Bordeaux region',
    category: 'Wine & Spirits',
    basePrice: 8.50,
    minOrder: 120,
    pricingTiers: [
      { quantity: 100, price: 12.00 },
      { quantity: 501, price: 10.50 },
      { quantity: 2001, price: 8.50 }
    ],
    stock: 5000,
    rating: 4.8,
    reviews: 342,
    certification: ['Organic', 'Fair Trade'],
    images: []
  };

  res.status(200).json({
    success: true,
    data: product
  });
});

// Search products
router.get('/search', (req, res) => {
  const { q } = req.query;

  // TODO: Implement full-text search
  res.status(200).json({
    success: true,
    data: [],
    query: q
  });
});

module.exports = router;
