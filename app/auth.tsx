import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Auth() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: '#0BE602',
          fontSize: 28,
          fontWeight: '600',
          marginBottom: 12,
        }}
      >
        UniPay
      </Text>

      <Text
        style={{
          color: '#9CA3AF',
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Auth screen coming soon 🚧{"\n"}
        UI & backend will be added later.
      </Text>

      {/* TEMP BUTTON – OPTIONAL */}
      <TouchableOpacity
        onPress={() => router.replace('/')}
        style={{
          borderColor: '#0BE602',
          borderWidth: 1,
          paddingVertical: 12,
          paddingHorizontal: 28,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: '#0BE602', fontWeight: '500' }}>
          Back to Landing
        </Text>
      </TouchableOpacity>
    </View>
  );
}
