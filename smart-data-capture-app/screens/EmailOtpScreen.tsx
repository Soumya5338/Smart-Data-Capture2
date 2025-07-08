import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function EmailOtpScreen({ navigation }: any) {
  const [email, setEmail] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post('http://192.168.145.55:3000/send-otp', { email });
      Alert.alert('OTP sent to your email');
      navigation.navigate('OtpVerification', { email }); // ✅ Pass email to next screen
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.error || 'Failed to send OTP');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
