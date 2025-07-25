import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://192.168.145.55:3000';

export default function OtpVerificationScreen({ route }: any) {
  const [otp, setOtp] = useState('');
  const { email, phone, setAuth } = route.params;

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/verify-otp`, {
        email,
        phone,
        otp,
      });

      if (res.data.verified) {
        Alert.alert('Success', 'OTP Verified!');
        if (typeof setAuth === 'function') setAuth(true); // ✅ triggers login
      } else {
        Alert.alert('Invalid OTP', res.data.message || '');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        style={styles.input}
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
