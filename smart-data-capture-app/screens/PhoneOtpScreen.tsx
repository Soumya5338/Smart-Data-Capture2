import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const APP_ENDPOINT = 'https://abcd-efgh.authgear.cloud'; // 🔁 Replace this

export default function PhoneOtpScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const sendOtp = async () => {
    try {
      const res = await axios.post(`${APP_ENDPOINT}/oauth2/api/v1/authenticate`, {
        client_id: 'c10701ea07359b1b', // from Portal
        x_channel: 'sms',
        login_id: phone,
        flow: 'login',
      });

      setSessionId(res.data.session_id);
      setSent(true);
      Alert.alert('OTP sent!', 'Please check your SMS.');
    } catch (err) {
      console.error(err);
      Alert.alert('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${APP_ENDPOINT}/oauth2/api/v1/verify`, {
        session_id: sessionId,
        code,
      });

      const token = res.data.access_token;
      console.log('✅ Logged in! Token:', token);
      Alert.alert('Success', 'You are logged in!');
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Invalid OTP or session');
    }
  };

  return (
    <View style={styles.container}>
      {!sent ? (
        <>
          <Text>Enter Phone Number:</Text>
          <TextInput
            placeholder="+91xxxxxxxxxx"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <Button title="Send OTP" onPress={sendOtp} />
        </>
      ) : (
        <>
          <Text>Enter OTP:</Text>
          <TextInput
            placeholder="Enter OTP"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Verify OTP" onPress={verifyOtp} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 15,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
