import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from '@/constants/theme';

export default function Layout() {
  const { colors, fonts } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const value = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(value === 'true');
    };

    checkAuth();
  }, []);

  // While checking auth state → render nothing
  if (isLoggedIn === null) {
    return null;
  }

  // 🔒 NOT LOGGED IN → NO DRAWER, NO HEADER
  if (!isLoggedIn) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    );
  }

  // 🔓 LOGGED IN → FULL DRAWER NAVIGATION
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

          drawerActiveBackgroundColor: colors.primary + '20',
          drawerActiveTintColor: colors.primary,
        }}
      >
        {/* 🏠 Home */}
        <Drawer.Screen
          name="index"
          options={{ title: 'Home' }}
        />

        {/* 👤 Profile */}
        <Drawer.Screen
          name="profile"
          options={{ title: 'My Profile' }}
        />

        {/* 📷 Scan */}
        <Drawer.Screen
          name="scan"
          options={{ title: 'Scan & Pay' }}
        />

        {/* 📜 History */}
        <Drawer.Screen
          name="history"
          options={{ title: 'Transactions' }}
        />

        {/* 💰 Balance */}
        <Drawer.Screen
          name="balance"
          options={{ title: 'Balance' }}
        />

        {/* 🛠 Admin */}
        <Drawer.Screen
          name="admin"
          options={{ title: 'Admin Panel' }}
        />

        {/* ℹ️ About */}
        <Drawer.Screen
          name="about"
          options={{ title: 'About' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
