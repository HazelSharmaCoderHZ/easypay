import { FlatList, StyleSheet, Text, View } from 'react-native';

const data = [
  { id: '1', vendor: 'Canteen', amount: 120 },
  { id: '2', vendor: 'Cafe', amount: 80 },
  { id: '3', vendor: 'Mess', amount: 150 },
];

export default function Transactions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.vendor}>{item.vendor}</Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 15,
  },

  title: {
    color: '#38bdf8',
    fontSize: 22,
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#334155',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  vendor: {
    color: 'white',
    fontSize: 16,
  },

  amount: {
    color: '#22c55e',
    marginTop: 5,
  },
});
