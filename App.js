import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Components/DrawerNavigator'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);


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