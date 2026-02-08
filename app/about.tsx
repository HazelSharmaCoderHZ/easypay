import { StyleSheet, Text, View } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Campus QR Meal Pay</Text>

      <Text style={styles.text}>
        Campus QR Meal Pay is a postpaid meal
        payment system designed for universities.
      </Text>

      <Text style={styles.text}>
        Students scan their QR code at campus
        eateries and payments are added to
        semester fees automatically.
      </Text>

      <Text style={styles.text}>
        This ensures fast, cashless, and secure
        transactions in a closed ecosystem.
      </Text>

      <Text style={styles.footer}>
        Version 1.0 | Prototype
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 25,
  },

  title: {
    fontSize: 24,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  text: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'center',
  },

  footer: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 30,
  },
});
