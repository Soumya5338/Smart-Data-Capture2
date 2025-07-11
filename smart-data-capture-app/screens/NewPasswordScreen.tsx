import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://192.168.145.55:3000';

export default function NewPasswordScreen({ route, navigation }: any) {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');

  const resetPassword = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/reset-password`, {
        email,
        password: newPassword, // ✅ Correct key
      });

      if (res.data.success) {
        Alert.alert('Success', 'Password has been reset!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', res.data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('❌ Server error:', err);
      Alert.alert('Error', 'Server error while resetting password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <Button title="Reset Password" onPress={resetPassword} />
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
