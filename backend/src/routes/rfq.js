const express = require('express');
const router = express.Router();

// Create RFQ (Request for Quote)
router.post('/', (req, res) => {
  try {
    const { productId, quantity, destination, deliveryDate, specifications } = req.body;

    // TODO: Create RFQ and notify suppliers
    const rfq = {
      id: 'RFQ-' + Date.now(),
      productId,
      quantity,
      destination,
      deliveryDate,
      specifications,
      status: 'sent',
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'RFQ created and sent to suppliers',
      data: rfq
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get RFQ details
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // TODO: Query RFQ with associated quotes
  const rfq = {
    id,
    productId: '1',
    quantity: 5000,
    destination: 'New York, USA',
    deliveryDate: '2024-08-31',
    quotes: [
      {
        supplierId: 'SUP-001',
        supplierName: 'Chateaux Bordeaux',
        unitPrice: 8.50,
        totalPrice: 42500,
        deliveryDays: 30,
        validUntil: '2024-07-18'
      }
    ]
  };

  res.status(200).json({
    success: true,
    data: rfq
  });
});

// Get user RFQs
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;

  // TODO: Query all RFQs for user
  res.status(200).json({
    success: true,
    data: []
  });
});

module.exports = router;
