import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'Any',
    minOrder: 'Any'
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <Feather name="search" size={20} color="#757575" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search beverages, vineyards..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#757575"
        />
      </View>

      {/* Filters */}
      <ScrollView style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Filters</Text>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Category</Text>
          <View style={styles.filterOptions}>
            {['All', 'Wine & Spirits', 'Craft Beer', 'Soft Drinks', 'Bulk Ingredients'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterOption,
                  filters.category === cat && styles.filterOptionActive
                ]}
                onPress={() => setFilters({ ...filters, category: cat })}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    filters.category === cat && styles.filterOptionTextActive
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Range Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Price Range</Text>
          <View style={styles.filterOptions}>
            {['Any', '$0-$10', '$10-$50', '$50+'].map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.filterOption,
                  filters.priceRange === range && styles.filterOptionActive
                ]}
                onPress={() => setFilters({ ...filters, priceRange: range })}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    filters.priceRange === range && styles.filterOptionTextActive
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16
  },
  filterSection: {
    marginBottom: 24
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  filterOptionActive: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F'
  },
  filterOptionText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500'
  },
  filterOptionTextActive: {
    color: '#FFFFFF'
  }
});

export default SearchScreen;
