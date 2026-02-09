import { auth } from "@/lib/firebase";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { signOut } from "firebase/auth";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function StudentLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/landing");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
              flex: 1,
              backgroundColor: "#0BE602",
            }}
          >
            {/* Header */}
            <View style={{ padding: 20 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "800",
                  color: "#000",
                }}
              >
                UniPay
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#000",
                  opacity: 0.7,
                }}
              >
                Student Panel
              </Text>
            </View>

            {/* Drawer Screens */}
            <View style={{ flex: 1 }}>
              <DrawerItemList {...props} />
            </View>

            {/* Logout */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#00000030",
                padding: 10,
              }}
            >
              <DrawerItem
                label="Logout"
                onPress={handleLogout}
                labelStyle={{
                  color: "#000",
                  fontWeight: "700",
                }}
              />
            </View>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0BE602",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "700",
          },
          drawerStyle: {
            backgroundColor: "#0BE602",
          },
          drawerLabelStyle: {
            color: "#000",
            fontSize: 15,
            fontWeight: "600",
          },
          drawerActiveBackgroundColor: "#0aa902",
          drawerActiveTintColor: "#000",
          drawerInactiveTintColor: "#000",
          drawerItemStyle: {
            borderRadius: 14,
            marginHorizontal: 10,
          },
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="analytics" options={{ title: "Analytics" }} />
        <Drawer.Screen name="statement" options={{ title: "Statement" }} />
        <Drawer.Screen name="set-goal" options={{ title: "Set Goal" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
