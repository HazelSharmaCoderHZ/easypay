import { useTheme } from '@/constants/theme';
import { FlatList, StyleSheet, Text, View } from 'react-native';

/* 🔹 Sample Data (Later from Firebase) */
const data = [
  {
    id: '1',
    vendor: 'Main Canteen',
    amount: 120,
    date: '06 Feb 2026 • 12:45 PM',
  },
  {
    id: '2',
    vendor: 'Cafe Coffee',
    amount: 85,
    date: '05 Feb 2026 • 04:10 PM',
  },
  {
    id: '3',
    vendor: 'Hostel Mess',
    amount: 150,
    date: '04 Feb 2026 • 08:30 PM',
  },
];

export default function History() {
  const { colors, fonts } = useTheme();

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.list}

      data={data}
      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Vendor */}
          <Text
            style={[
              styles.vendor,
              {
                color: colors.text,
                fontFamily: fonts.roundedBold,
              },
            ]}
          >
            {item.vendor}
          </Text>

          {/* Amount */}
          <Text
            style={[
              styles.amount,
              {
                color: colors.success,
                fontFamily: fonts.monoBold,
              },
            ]}
          >
            ₹ {item.amount}
          </Text>

          {/* Date */}
          <Text
            style={[
              styles.date,
              {
                color: colors.muted,
                fontFamily: fonts.rounded,
              },
            ]}
          >
            {item.date}
          </Text>
        </View>
      )}
    />
  );
}

/* 🎨 Styles */

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },

  card: {
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,

    borderWidth: 1,
    elevation: 2,
  },

  vendor: {
    fontSize: 16,
    marginBottom: 4,
  },

  amount: {
    fontSize: 18,
    marginBottom: 4,
  },

  date: {
    fontSize: 13,
  },
});
