import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Global Beverages Inc',
    phone: '+1 (555) 123-4567',
    userType: 'Buyer'
  });

  const menuItems = [
    { icon: 'package', label: 'My Orders', action: 'orders' },
    { icon: 'edit-3', label: 'Edit Profile', action: 'edit' },
    { icon: 'bookmark', label: 'Saved Products', action: 'saved' },
    { icon: 'settings', label: 'Settings', action: 'settings' },
    { icon: 'help-circle', label: 'Help & Support', action: 'help' },
    { icon: 'log-out', label: 'Logout', action: 'logout' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* User Info */}
      <ScrollView style={styles.content}>
        <View style={styles.userCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarTextLarge}>{user.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userType}>{user.userType}</Text>
          <Text style={styles.userCompany}>{user.company}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.action} style={styles.menuItem}>
              <Feather name={item.icon} size={20} color="#1A1A1A" />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color="#757575" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  userCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  avatarTextLarge: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4
  },
  userType: {
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: '600',
    marginBottom: 8
  },
  userCompany: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500'
  },
  menuContainer: {
    marginTop: 12
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  menuLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A'
  }
});

export default ProfileScreen;
