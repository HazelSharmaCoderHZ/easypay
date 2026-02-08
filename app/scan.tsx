import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission?.granted) {
    requestPermission();
    return <Text>Requesting Camera...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Vendor QR</Text>

      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={(data) => {
          setScanned(true);
          alert('Payment Recorded: ' + data.data);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  title: {
    color: '#38bdf8',
    textAlign: 'center',
    margin: 15,
    fontSize: 20,
  },

  camera: {
    flex: 1,
  },
});
