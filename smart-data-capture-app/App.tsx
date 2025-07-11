import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import MyScansScreen from './screens/MyScansScreen';
import PremiumScreen from './screens/PremiumScreen';
import FAQScreen from './screens/FAQScreen';
import SettingsScreen from './screens/SettingsScreen';
import InviteScreen from './screens/InviteScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import PhoneOtpScreen from './screens/PhoneOtpScreen';
import EmailOtpScreen from './screens/EmailOtpScreen';
import OtpVerificationScreen from './screens/OtpVerificationScreen';
import OtpChoiceScreen from './screens/OtpChoiceScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetOtpVerificationScreen from './screens/ResetOtpVerificationScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#EF156F',
        drawerLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="My Scans" component={MyScansScreen} />
      <Drawer.Screen name="Get Premium" component={PremiumScreen} />
      <Drawer.Screen name="F.A.Q" component={FAQScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Invite Friend" component={InviteScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setAuth={setIsAuthenticated} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="OtpChoice" component={OtpChoiceScreen} />

            <Stack.Screen name="PhoneOtp">
              {(props) => <PhoneOtpScreen {...props} setAuth={setIsAuthenticated} />}
            </Stack.Screen>

            <Stack.Screen name="EmailOtp">
              {(props) => <EmailOtpScreen {...props} setAuth={setIsAuthenticated} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetOtpVerification" component={ResetOtpVerificationScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />


            <Stack.Screen name="OtpVerification">
              {(props) => <OtpVerificationScreen {...props} setAuth={setIsAuthenticated} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Drawer" component={DrawerScreens} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
