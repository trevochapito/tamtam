import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const products = [
    {
      id: '1',
      name: 'Premium Bordeaux Merlot 2022',
      supplier: 'Chateaux Bordeaux',
      price: '$8.50 - $12.00',
      minOrder: 120,
      rating: 4.8,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Craft IPA Beer',
      supplier: 'Brew Co',
      price: '$4.50 - $6.00',
      minOrder: 250,
      rating: 4.6,
      image: 'https://via.placeholder.com/150'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>TamTam</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Feather name="bell" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#757575" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search beverages...</Text>
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTitle}>Global Sourcing.</Text>
        <Text style={styles.heroSubtitle}>Minimalist Effort.</Text>
      </View>

      {/* Navigation Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navTabs}>
        {['All Drinks', 'Wine & Spirits', 'Craft Beer', 'Soft Drinks'].map((tab) => (
          <TouchableOpacity key={tab} style={styles.navTab}>
            <Text style={styles.navTabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productSupplier}>{product.supplier}</Text>
            <Text style={styles.productPrice}>{product.price} / Bottle</Text>
            <Text style={styles.productMinOrder}>Min. Order: {product.minOrder} Bottles</Text>
            <View style={styles.productActions}>
              <TouchableOpacity style={styles.sampleBtn}>
                <Text style={styles.sampleBtnText}>Request Sample</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatBtn}>
                <Text style={styles.chatBtnText}>Chat Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F'
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12
  },
  searchContainer: {
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
  searchIcon: {
    marginRight: 8
  },
  searchPlaceholder: {
    color: '#757575',
    fontSize: 16
  },
  heroBanner: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#D32F2F',
    marginTop: 8
  },
  navTabs: {
    paddingHorizontal: 16,
    marginVertical: 12
  },
  navTab: {
    marginRight: 16
  },
  navTabText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500'
  },
  productsContainer: {
    paddingHorizontal: 16,
    marginBottom: 32
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4
  },
  productSupplier: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 14,
    color: '#D32F2F',
    fontWeight: '600',
    marginBottom: 4
  },
  productMinOrder: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 12
  },
  productActions: {
    flexDirection: 'row',
    gap: 8
  },
  sampleBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    alignItems: 'center'
  },
  sampleBtnText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500'
  },
  chatBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#D32F2F',
    borderRadius: 6,
    alignItems: 'center'
  },
  chatBtnText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600'
  }
});

export default HomeScreen;
