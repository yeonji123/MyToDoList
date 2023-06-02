import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Components/DrawerNavigator'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import Login from './Screen/Login';
import Join from './Screen/Join';
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}