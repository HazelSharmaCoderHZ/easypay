import { StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Students: 1250</Text>
        <Text style={styles.item}>Vendors: 18</Text>
        <Text style={styles.item}>Transactions: 24,500</Text>
        <Text style={styles.item}>Pending: ₹1.2L</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#38bdf8',
    fontSize: 24,
    marginBottom: 25,
  },

  card: {
    borderWidth: 1,
    borderColor: '#0ea5e9',
    padding: 25,
    borderRadius: 12,
    width: '85%',
  },

  item: {
    color: 'white',
    fontSize: 17,
    marginBottom: 12,
  },
});
