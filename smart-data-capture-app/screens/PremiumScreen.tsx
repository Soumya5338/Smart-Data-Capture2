import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  FontAwesome,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PremiumScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Upgrade to Premium</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Top User Info */}
        <View style={styles.userInfo}>
          <FontAwesome name="user-circle-o" size={28} color="#EF156F" />
          <Text style={styles.userText}>You are a Free User</Text>
        </View>

        {/* Feature List */}
        <View style={styles.features}>
          <Feature
            icon={<MaterialCommunityIcons name="checkbox-marked-circle-outline" size={22} color="#EF156F" />}
            text="Unlimited Premium Scans"
          />
          <Feature
            icon={<Entypo name="globe" size={20} color="#EF156F" />}
            text="Supports all Languages"
          />
          <Feature
            icon={<Feather name="check-circle" size={20} color="#EF156F" />}
            text="High-accuracy (99.9%)"
          />
          <Feature
            icon={<Feather name="file-text" size={20} color="#EF156F" />}
            text="Batch File Recognition"
          />
          <Feature
            icon={<Entypo name="block" size={20} color="#EF156F" />}
            text="100% Ad-Free"
          />
        </View>

        {/* Price Section */}
        <Text style={styles.priceLabel}>Lifetime Premium</Text>
        <Text style={styles.price}>₹690.00</Text>

        {/* Buy Button */}
        <TouchableOpacity style={styles.buyButton} onPress={() => alert('Coming soon!')}>
          <Text style={styles.buyButtonText}>BUY NOW</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const Feature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <View style={styles.featureItem}>
    {icon}
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#EF156F',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF156F',
  },
  features: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  priceLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#777',
  },
  price: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EF156F',
    marginVertical: 10,
  },
  buyButton: {
    backgroundColor: '#EF156F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PremiumScreen;
