import { useTheme } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function Balance() {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.primary,
            fontFamily: fonts.roundedBold,
          },
        ]}
      >
        Current Balance
      </Text>

      <Text
        style={[
          styles.amount,
          {
            color: colors.secondary,
            fontFamily: fonts.monoBold,
          },
        ]}
      >
        ₹ 2,350
      </Text>

      <Text
        style={[
          styles.info,
          {
            color: colors.muted,
            fontFamily: fonts.rounded,
          },
        ]}
      >
        Semester Limit: ₹ 45,000
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    marginBottom: 10,
  },

  amount: {
    fontSize: 42,
    marginVertical: 20,
  },

  info: {
    fontSize: 15,
  },
});
