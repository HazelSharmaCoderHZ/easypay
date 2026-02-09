import { useTheme } from "@/constants/theme";
import { Drawer } from "expo-router/drawer";

export default function StudentLayout() {
  const { colors } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        drawerStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="scan"
        options={{ title: "Scan & Pay" }}
      />
      <Drawer.Screen
        name="history"
        options={{ title: "Transactions" }}
      />
      <Drawer.Screen
        name="profile"
        options={{ title: "Profile" }}
      />
    </Drawer>
  );
}
