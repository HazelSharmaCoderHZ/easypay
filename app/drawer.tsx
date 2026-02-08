import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useTheme } from "@/constants/theme";

export default function DrawerLayout() {
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

          drawerActiveBackgroundColor:
            colors.primary + "20",

          drawerActiveTintColor: colors.primary,
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="profile" />
        <Drawer.Screen name="scan" />
        <Drawer.Screen name="history" />
        <Drawer.Screen name="about" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
