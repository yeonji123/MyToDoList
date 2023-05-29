import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import DrawerNavigator from './Components/DrawerNavigator'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
