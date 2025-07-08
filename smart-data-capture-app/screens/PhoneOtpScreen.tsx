import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function PhoneOtpScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post('http://<your-ip>:3000/send-otp-phone', { phone });
      Alert.alert('OTP sent to your phone (check console)');
      navigation.navigate('OtpVerification', { identifier: phone });
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
