// MongoDB Collections Schema (using Mongoose)

const mongoose = require('mongoose');

// Chat Messages Schema
const chatMessageSchema = new mongoose.Schema({
  room_id: String,
  sender_id: Number,
  sender_name: String,
  message: String,
  attachments: [{
    file_name: String,
    file_url: String,
    file_type: String
  }],
  timestamp: { type: Date, default: Date.now },
  read_by: [Number]
});

// Notifications Schema
const notificationSchema = new mongoose.Schema({
  user_id: Number,
  type: String, // 'order', 'quote', 'message', 'system'
  title: String,
  message: String,
  related_id: Number,
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

// Product Specifications Schema (flexible)
const productSpecSchema = new mongoose.Schema({
  product_id: Number,
  sku: String,
  specifications: mongoose.Schema.Types.Mixed, // Flexible object for various product types
  packaging: String,
  certifications: [String],
  compliance_info: mongoose.Schema.Types.Mixed,
  updated_at: { type: Date, default: Date.now }
});

// Audit Logs Schema
const auditLogSchema = new mongoose.Schema({
  user_id: Number,
  action: String,
  resource_type: String,
  resource_id: Number,
  changes: mongoose.Schema.Types.Mixed,
  ip_address: String,
  user_agent: String,
  timestamp: { type: Date, default: Date.now }
});

// User Preferences Schema
const userPreferenceSchema = new mongoose.Schema({
  user_id: Number,
  preferred_suppliers: [Number],
  preferred_categories: [String],
  notification_settings: {
    email_notifications: Boolean,
    push_notifications: Boolean,
    sms_notifications: Boolean
  },
  saved_searches: [String],
  updated_at: { type: Date, default: Date.now }
});

module.exports = {
  ChatMessage: mongoose.model('ChatMessage', chatMessageSchema),
  Notification: mongoose.model('Notification', notificationSchema),
  ProductSpec: mongoose.model('ProductSpec', productSpecSchema),
  AuditLog: mongoose.model('AuditLog', auditLogSchema),
  UserPreference: mongoose.model('UserPreference', userPreferenceSchema)
};
