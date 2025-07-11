import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://192.168.145.55:3000';

export default function PhoneOtpScreen({ navigation, setAuth }: any) {
  const [phone, setPhone] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/send-otp`, { phone });
      Alert.alert('OTP Sent', 'Check SMS or console.');
      navigation.navigate('OtpVerification', { phone, setAuth }); // 👈 Pass phone + setAuth
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Phone Number:</Text>
      <TextInput
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
