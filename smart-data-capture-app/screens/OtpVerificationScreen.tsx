import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function OtpVerifyScreen({ navigation, route, setAuth }: any) {
  const [otp, setOtp] = useState('');
  const email = route.params?.email;

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://192.168.145.55:3000/verify-otp', { email, otp });

      if (res.data.verified) {
        Alert.alert('Success', 'OTP Verified!');
        setAuth(true); // ✅ This will trigger login to home
      } else {
        Alert.alert('Failed', 'Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
});
