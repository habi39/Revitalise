import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = React.useState<null | boolean>(null);
    let routeName;
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value: any) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, []);

  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
      routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
      <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen name="Onboarding" component= {OnboardingScreen} options = {{header: ()=> null}}/>
          <Stack.Screen name="Login" component= {LoginScreen} options = {{header: ()=> null}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={({ navigation }) => ({
            
      })} />

    </Stack.Navigator>
  );




}
export default AuthStack;