import { useTheme } from '@/constants/theme';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Landing() {
  const { colors, fonts } = useTheme();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      {/* 🌟 Hero Section */}
      <Animated.View
        entering={FadeInDown}
        style={[
          styles.hero,
          { backgroundColor: colors.primary },
        ]}
      >
        <Text
          style={[
            styles.title,
            { fontFamily: fonts.roundedBold },
          ]}
        >
          Campus QR Meal Pay
        </Text>

        <Text
          style={[
            styles.tagline,
            { fontFamily: fonts.rounded },
          ]}
        >
          Scan • Eat • Go • Pay Later
        </Text>
      </Animated.View>

      {/* 📌 Sections */}
      <Section
        title="Why This App?"
        text="No cash. No UPI delay. No prepaid cards."
      />

      <Section
        title="How It Works"
        text="Scan QR → Eat → Bill Added to Semester Fee"
      />

      <Section
        title="Benefits"
        text="Secure • Transparent • Fast • Smart"
      />

      <Section
        title="For Students"
        text="Track spending, limits, and history."
      />

      <Section
        title="For Vendors"
        text="Instant payment logging."
      />

      <Section
        title="For Admins"
        text="Centralized dashboard."
      />

    </ScrollView>
  );
}

/* 🔹 Section Component */

function Section({ title, text }: any) {
  const { colors, fonts } = useTheme();

  return (
    <Animated.View
      entering={FadeInDown}
      style={[
        styles.section,
        { backgroundColor: colors.card },
      ]}
    >
      <Text
        style={[
          styles.heading,
          {
            color: colors.primary,
            fontFamily: fonts.roundedBold,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontFamily: fonts.rounded,
          },
        ]}
      >
        {text}
      </Text>
    </Animated.View>
  );
}

/* 🎨 Styles */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  hero: {
    padding: 40,
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 32,
  },

  tagline: {
    color: '#e0e7ff',
    marginTop: 10,
    fontSize: 15,
  },

  section: {
    padding: 25,
    margin: 15,
    borderRadius: 15,
    elevation: 3,
  },

  heading: {
    fontSize: 20,
    marginBottom: 6,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
  },
});
