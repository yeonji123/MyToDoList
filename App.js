import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// my page
import Main from './Pages/Main/Main';
import Todo from './Pages/Function/Todo';
import CalendarComponent from './Pages/Function/CalendarComponent';


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tap.Navigator>
          <Tap.Screen name="Main" component={Main} />
          <Tap.Screen name="CalendarComponent" component={CalendarComponent} />
          <Tap.Screen name="Todo" component={Todo} />
        </Tap.Navigator>
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
