import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Premium Bordeaux Merlot 2022',
      quantity: 120,
      unitPrice: 12.00,
      totalPrice: 1440.00
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = 150;
  const total = subtotal + shipping;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.itemsContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>${item.totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn}>
              <Feather name="trash-2" size={20} color="#757575" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Order Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 8
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A'
  },
  itemQuantity: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D32F2F',
    marginTop: 4
  },
  removeBtn: {
    padding: 8
  },
  summary: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575'
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A'
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTopY: 12
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F'
  },
  checkoutBtn: {
    backgroundColor: '#D32F2F',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default CartScreen;
