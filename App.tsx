
import React from 'react';
import Providers from './src/navigation';
import { StyleSheet } from 'react-native';
import { LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'


LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['VirtualizedLists']);
LogBox.ignoreLogs(['undefined is not an object']);
LogBox.ignoreLogs(['Unexpected status line']);
const AppStack = createStackNavigator();

const App = () => {
  return <Providers/>
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
