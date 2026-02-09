import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
  try {
    console.log("Attempting login...");
    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );
    console.log("Login successful");
  } catch (err: any) {
    console.log("Login error:", err.code, err.message);
    Alert.alert("Login failed", err.message);
  }
};


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      <Text style={{ color: '#0BE602', fontSize: 28, marginBottom: 30 }}>
        UniPay Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: '#333',
          color: '#fff',
          padding: 14,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#6B7280"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: '#333',
          color: '#fff',
          padding: 14,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      {error !== '' && (
        <Text style={{ color: 'red', marginBottom: 12 }}>
          {error}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#0BE602',
          padding: 16,
          borderRadius: 14,
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: '600' }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
