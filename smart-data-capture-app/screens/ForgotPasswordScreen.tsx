import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');

  const sendResetOtp = async () => {
    try {
      await axios.post('http://192.168.145.55:3000/send-otp', { email }); // same endpoint
      Alert.alert('OTP sent to your email');
      navigation.navigate('ResetOtpVerification', { email });
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter registered email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send OTP" onPress={sendResetOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
});
