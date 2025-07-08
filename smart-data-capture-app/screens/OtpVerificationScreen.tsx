import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function OtpVerificationScreen({ navigation, route, setAuth }: any) {
  const [otp, setOtp] = useState('');
  const { email } = route.params; // ✅ Received from EmailOtpScreen

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://192.168.145.55:3000/verify-otp', {
        email,
        otp: otp.trim(),
      });

      if (response.data.verified) {
        Alert.alert('✅ OTP Verified');
        setAuth(true); // ✅ Set login true
      } else {
        Alert.alert('❌ Invalid OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        onChangeText={setOtp}
        value={otp}
        maxLength={6}
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
