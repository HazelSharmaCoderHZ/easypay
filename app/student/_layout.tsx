import { useTheme } from "@/constants/theme";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function StudentDrawerLayout() {
  const { colors, fonts } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
          },

          headerTintColor: colors.primary,

          headerTitleStyle: {
            fontFamily: fonts.roundedBold,
          },

          drawerStyle: {
            backgroundColor: colors.background,
          },

          drawerLabelStyle: {
            color: colors.text,
            fontFamily: fonts.rounded,
            fontSize: 15,
          },

          drawerActiveBackgroundColor: colors.primary + "20",
          drawerActiveTintColor: colors.primary,
        }}
      >
        {/* 🏠 Student Home */}
        <Drawer.Screen
          name="index"
          options={{ title: "Home" }}
        />

        {/* 📷 Scan & Pay */}
        <Drawer.Screen
          name="scan"
          options={{ title: "Scan & Pay" }}
        />

        {/* 📜 Transaction History */}
        <Drawer.Screen
          name="history"
          options={{ title: "Transactions" }}
        />

        {/* 👤 Profile / UniPass */}
        <Drawer.Screen
          name="profile"
          options={{ title: "My UniPass" }}
        />

        {/* ℹ️ About */}
        <Drawer.Screen
          name="about"
          options={{ title: "About UniPay" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
