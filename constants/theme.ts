import { useColorScheme } from 'react-native';

/* 🎨 Colors */

export const Colors = {
  light: {
    primary: '#0d0f62',
    secondary: '#ec4899',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    muted: '#64748b',
    success: '#22c55e',
    danger: '#ef4444',
    border: '#e2e8f0',
    tint: '#6366f1',
  },

  dark: {
    primary: '#818cf8',
    secondary: '#f472b6',
    background: '#020617',
    card: '#020617',
    text: '#f8fafc',
    muted: '#94a3b8',
    success: '#22c55e',
    danger: '#f87171',
    border: '#334155',
    tint: '#818cf8',
  },
};

/* ✍️ Fonts */

export const Fonts = {
  rounded: 'Nunito_600SemiBold',
  roundedBold: 'Nunito_800ExtraBold',

  mono: 'JetBrainsMono_400Regular',
  monoBold: 'JetBrainsMono_700Bold',
};

/* 🌟 Unified Theme Hook */

export function useTheme() {
  const scheme = useColorScheme() ?? 'light';

  return {
    colors: Colors[scheme],
    fonts: Fonts,
  };
}

/* ✅ Default theme export (for legacy code) */

export const theme = {
  colors: Colors.light,
  fonts: Fonts,
};
