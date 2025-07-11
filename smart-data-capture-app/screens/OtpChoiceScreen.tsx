import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OtpChoiceScreen({ navigation, route }: any) {
  const { username, password } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify your account</Text>
      <Text style={styles.subtext}>Choose how you want to receive your OTP:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('EmailOtp', { username, password })
        }
      >
        <Text style={styles.buttonText}>Send OTP via Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('PhoneOtp', { username, password })
        }
      >
        <Text style={styles.buttonText}>Send OTP via Phone</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#EF156F',
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  button: {
    backgroundColor: '#EF156F',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
