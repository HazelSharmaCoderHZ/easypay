import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UniPayFeatures = () => {
  const features = [
    { title: 'Instant Payments', desc: 'QR-based transactions in seconds.', icon: '⚡' },
    { title: 'Secure Identity', desc: 'Your data is encrypted & protected.', icon: '🛡️' },
    { title: 'Cashless Campus', desc: 'No physical wallet? No problem.', icon: '🎓' },
    { title: 'Spend Analytics', desc: 'Track and analyze your expenses.', icon: '📊' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>What UniPay Offers?</Text>
      
      <View style={styles.grid}>
        {features.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  headerText: {
    color: '#0BE602',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#161616', // Slightly lighter than pure black
    width: '48%',               // Fits two cards per row
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#02f212',     // Subtle border for depth
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDesc: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default UniPayFeatures;