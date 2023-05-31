import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './Components/DrawerNavigator'

export default function App() {
  return (
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>

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
