// RFQ (Request for Quote) Service

const createRFQ = async (req, db, io) => {
  const { productId, quantity, destination, deliveryDate, specifications, buyerId } = req.body;

  try {
    // Insert RFQ into database
    const rfqResult = await db.query(
      `INSERT INTO rfqs (buyer_id, product_id, rfq_number, quantity, destination, delivery_date, specifications, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, rfq_number, created_at`,
      [buyerId, productId, `RFQ-${Date.now()}`, quantity, destination, deliveryDate, JSON.stringify(specifications), 'sent']
    );

    const rfq = rfqResult.rows[0];

    // Get all suppliers for this product
    const suppliersResult = await db.query(
      `SELECT DISTINCT s.id, s.user_id FROM suppliers s
       JOIN products p ON p.supplier_id = s.id
       WHERE p.id = $1`,
      [productId]
    );

    // Notify suppliers via Socket.io
    suppliersResult.rows.forEach((supplier) => {
      io.to(`supplier_${supplier.user_id}`).emit('rfq:new', {
        rfqId: rfq.id,
        rfqNumber: rfq.rfq_number,
        quantity,
        destination
      });
    });

    return { success: true, rfq };
  } catch (error) {
    throw error;
  }
};

const generateQuote = async (req, db) => {
  const { rfqId, supplierId, unitPrice, deliveryDays, validUntil } = req.body;

  try {
    const rfqResult = await db.query('SELECT quantity FROM rfqs WHERE id = $1', [rfqId]);
    const quantity = rfqResult.rows[0].quantity;
    const totalPrice = unitPrice * quantity;

    const quoteResult = await db.query(
      `INSERT INTO rfq_quotes (rfq_id, supplier_id, unit_price, total_price, delivery_days, valid_until, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [rfqId, supplierId, unitPrice, totalPrice, deliveryDays, validUntil, 'pending']
    );

    return { success: true, quote: quoteResult.rows[0] };
  } catch (error) {
    throw error;
  }
};

module.exports = { createRFQ, generateQuote };
