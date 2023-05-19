import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// my page
import Main from './Components/Main';
import Todo from './Components/Todo';
import CalendarComponent from './Components/CalendarComponent';


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="CalendarComponent" component={CalendarComponent} />
          <Tab.Screen name="Main" component={Main} />
          <Tab.Screen name="Todo" component={Todo} />
        </Tab.Navigator>
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
