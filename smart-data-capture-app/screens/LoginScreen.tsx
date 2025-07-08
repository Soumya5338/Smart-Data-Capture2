import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function LoginScreen({ navigation }: any) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Platform.select({
      android: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
      ios: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
      web: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => navigation.replace('Home'))
        .catch((e) => Alert.alert('Error', e instanceof Error ? e.message : 'Unknown error'));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button title="📱 Login with Phone OTP" onPress={() => navigation.navigate('PhoneOtp')} />
      <Button title="📧 Login with Email OTP" onPress={() => navigation.navigate('EmailOtp')} />
      <Button
        title="🔐 Sign in with Google"
        onPress={() => {
          if (request) {
            promptAsync();
          } else {
            Alert.alert('Error', 'Google Login is not ready yet');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
});
