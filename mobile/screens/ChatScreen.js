import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ChatScreen = () => {
  const [conversations, setConversations] = useState([
    {
      id: '1',
      supplierName: 'Chateaux Bordeaux',
      lastMessage: 'We can offer a 5% discount for bulk orders',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      supplierName: 'Brew Co',
      lastMessage: 'Your order has been confirmed',
      timestamp: 'Yesterday',
      unread: false
    }
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Search Conversations */}
      <View style={styles.searchBox}>
        <Feather name="search" size={20} color="#757575" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor="#757575"
        />
      </View>

      {/* Conversations List */}
      <ScrollView style={styles.conversationsList}>
        {conversations.map((conv) => (
          <TouchableOpacity key={conv.id} style={styles.conversationItem}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{conv.supplierName.charAt(0)}</Text>
            </View>
            <View style={styles.conversationInfo}>
              <Text style={styles.supplierName}>{conv.supplierName}</Text>
              <Text style={[styles.lastMessage, conv.unread && styles.unreadMessage]}>
                {conv.lastMessage}
              </Text>
            </View>
            <View style={styles.conversationMeta}>
              <Text style={styles.timestamp}>{conv.timestamp}</Text>
              {conv.unread && <View style={styles.unreadBadge} />}
            </View>
          </TouchableOpacity>
        ))}
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A'
  },
  conversationsList: {
    paddingHorizontal: 16
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  conversationInfo: {
    flex: 1
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A'
  },
  lastMessage: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4
  },
  unreadMessage: {
    color: '#1A1A1A',
    fontWeight: '500'
  },
  conversationMeta: {
    alignItems: 'flex-end'
  },
  timestamp: {
    fontSize: 12,
    color: '#757575'
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D32F2F',
    marginTop: 4
  }
});

export default ChatScreen;
