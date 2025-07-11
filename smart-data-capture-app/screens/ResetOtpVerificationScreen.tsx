import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ResetOtpVerificationScreen({ navigation, route }: any) {
  const [otp, setOtp] = useState('');
  const { email } = route.params;

  const verifyResetOtp = async () => {
    try {
      const res = await axios.post('http://192.168.145.55:3000/verify-otp', {
        email,
        otp,
      });

      if (res.data.verified) {
        Alert.alert('Success', 'OTP verified. Reset your password.');
        navigation.navigate('NewPassword', { email }); // ✅ Navigate to reset screen
      } else {
        Alert.alert('Invalid OTP', res.data.message || 'Try again');
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
      <Button title="Verify OTP" onPress={verifyResetOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
});
