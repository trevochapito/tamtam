-- PostgreSQL Database Schema for TamTam

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  phone VARCHAR(20),
  user_type ENUM('buyer', 'supplier', 'admin') DEFAULT 'buyer',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Suppliers Table
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(255),
  website VARCHAR(255),
  country VARCHAR(100),
  rating DECIMAL(3, 2),
  total_reviews INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_suppliers_verified ON suppliers(verified);

-- Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  supplier_id INT NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  base_price DECIMAL(10, 2) NOT NULL,
  min_order_quantity INT NOT NULL,
  stock_quantity INT NOT NULL,
  sku VARCHAR(100) UNIQUE,
  image_url VARCHAR(255),
  rating DECIMAL(3, 2),
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_products_category ON products(category);

-- Pricing Tiers Table
CREATE TABLE pricing_tiers (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  min_quantity INT NOT NULL,
  max_quantity INT,
  unit_price DECIMAL(10, 2) NOT NULL,
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pricing_tiers_product ON pricing_tiers(product_id);

-- Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  buyer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  total_amount DECIMAL(12, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_method VARCHAR(50),
  tracking_number VARCHAR(100),
  payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Order Items Table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  supplier_id INT NOT NULL REFERENCES suppliers(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- RFQs (Request for Quote) Table
CREATE TABLE rfqs (
  id SERIAL PRIMARY KEY,
  buyer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  rfq_number VARCHAR(50) UNIQUE NOT NULL,
  quantity INT NOT NULL,
  destination VARCHAR(255) NOT NULL,
  delivery_date DATE,
  specifications TEXT,
  status ENUM('draft', 'sent', 'quoted', 'accepted', 'rejected') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rfqs_buyer ON rfqs(buyer_id);
CREATE INDEX idx_rfqs_status ON rfqs(status);

-- RFQ Quotes Table
CREATE TABLE rfq_quotes (
  id SERIAL PRIMARY KEY,
  rfq_id INT NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  supplier_id INT NOT NULL REFERENCES suppliers(id),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  delivery_days INT,
  valid_until DATE,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rfq_quotes_rfq ON rfq_quotes(rfq_id);
CREATE INDEX idx_rfq_quotes_supplier ON rfq_quotes(supplier_id);

-- Shipping Quotes Table
CREATE TABLE shipping_quotes (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  weight DECIMAL(10, 2),
  volume DECIMAL(10, 2),
  shipping_method ENUM('air', 'sea', 'land') NOT NULL,
  estimated_days INT,
  cost DECIMAL(10, 2) NOT NULL,
  carrier_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shipping_quotes_order ON shipping_quotes(order_id);

-- Payments Table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  payment_method VARCHAR(50),
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  transaction_id VARCHAR(100),
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_order ON payments(order_id);

-- Reviews Table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  reviewer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  supplier_id INT REFERENCES suppliers(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_supplier ON reviews(supplier_id);
