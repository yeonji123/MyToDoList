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
import Calendar from './Components/CalendarComponent';

// header 왼쪽에 뜨는 버튼
import Menu from './Components/Menu'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Main'>
          <Tab.Screen name="Calendar" component={Calendar}
            options={{
              headerRight: () => <Menu />
            }} />
          <Tab.Screen name="Main" component={Main}
            options={{
              headerRight: () => <Menu />
            }} />
          <Tab.Screen name="Todo" component={Todo}
            options={{
              headerRight: () => <Menu />
            }} />
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
