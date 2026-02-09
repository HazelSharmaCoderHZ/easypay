import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import UniPayFeatures from '../components/unipayfeatures';

export default function Landing() {
  const router = useRouter();

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hasSeenLanding', 'true');
    router.replace('/auth');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      
      {/* LOGO */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Image
          source={require('../assets/unipay-logo.png')}
          style={{ width: 140, height: 140 }}
          resizeMode="contain"
        />
      </View>

      {/* TAGLINE */}
      <Text style={{
        color: '#fff',
        fontSize: 26,
        textAlign: 'center',
        marginTop: 12,
        fontWeight: '600',
        marginHorizontal: 20,
      }}>
        Fast. Secure. Contactless Payments
      </Text>

      {/* SERVICES */}
      <UniPayFeatures/>
      
      <Text style={{
        color: '#fff',
        fontSize: 26,
        textAlign: 'center',
        marginTop: 24,
        fontWeight: '600',
        marginHorizontal: 20,
      }}>
        Reimagining Payments for Digital Campus
      </Text>
      
      {/* CTA */}
      <TouchableOpacity
        onPress={handleGetStarted}
        style={{
          backgroundColor: '#0BE602',
          marginHorizontal: 24,
          marginVertical: 50,
          paddingVertical: 16,
          borderRadius: 14
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
          Get Started Today
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
