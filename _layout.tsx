import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: '#020617' },
          headerTintColor: '#28fa2c',
          drawerStyle: { backgroundColor: '#020617' },
          drawerLabelStyle: { color: 'white' },
        }}
      >
        <Drawer.Screen name="index" options={{ title: 'Home' }} />
        <Drawer.Screen name="profile" options={{ title: 'My QR' }} />
        <Drawer.Screen name="scan" options={{ title: 'Scan' }} />
        <Drawer.Screen name="transactions" options={{ title: 'Transactions' }} />
        <Drawer.Screen name="limits" options={{ title: 'Spending Limits' }} />
        <Drawer.Screen name="admin" options={{ title: 'Admin' }} />
        <Drawer.Screen name="about" options={{ title: 'About' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
