-- Sample Data for TamTam

-- Insert Users
INSERT INTO users (email, password_hash, name, company_name, user_type, verified) VALUES
('buyer@example.com', '$2a$10$...hashedpassword...', 'John Buyer', 'Global Beverages Inc', 'buyer', TRUE),
('supplier@bordeaux.com', '$2a$10$...hashedpassword...', 'Jean Dupont', 'Chateaux Bordeaux', 'supplier', TRUE),
('supplier@brewery.com', '$2a$10$...hashedpassword...', 'Bob Brewer', 'Brew Co', 'supplier', TRUE);

-- Insert Suppliers
INSERT INTO suppliers (user_id, business_name, description, country, verified) VALUES
(2, 'Chateaux Bordeaux', 'Premium French wine producer', 'France', TRUE),
(3, 'Brew Co', 'Craft brewery with global reach', 'USA', TRUE);

-- Insert Products
INSERT INTO products (supplier_id, name, description, category, base_price, min_order_quantity, stock_quantity, sku) VALUES
(1, 'Premium Bordeaux Merlot 2022', 'Premium French wine from Bordeaux region', 'Wine & Spirits', 8.50, 120, 5000, 'BORD-MERL-2022'),
(2, 'Craft IPA Beer', 'Hoppy craft IPA with bold flavors', 'Craft Beer', 4.50, 250, 10000, 'BREW-IPA-001');

-- Insert Pricing Tiers
INSERT INTO pricing_tiers (product_id, min_quantity, max_quantity, unit_price, discount_percentage) VALUES
(1, 100, 500, 12.00, 0),
(1, 501, 2000, 10.50, 12.5),
(1, 2001, NULL, 8.50, 29.2),
(2, 250, 1000, 6.00, 0),
(2, 1001, 5000, 5.00, 16.7);
