import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenLanding = await AsyncStorage.getItem('hasSeenLanding');

      if (hasSeenLanding === null) {
        router.replace('/landing');
      } else {
        router.replace('/auth');
      }

      setLoading(false);
    };

    checkFirstLaunch();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <ActivityIndicator size="large" color="#0BE602" />
    </View>
  );
}
