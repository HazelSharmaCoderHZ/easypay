import { StyleSheet, Text, View } from 'react-native';

export default function Limits() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Limits</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Daily: ₹500</Text>
        <Text style={styles.text}>Monthly: ₹12,000</Text>
        <Text style={styles.text}>Semester: ₹45,000</Text>
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
    fontSize: 22,
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: '#22c55e',
    padding: 25,
    borderRadius: 12,
  },

  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});
