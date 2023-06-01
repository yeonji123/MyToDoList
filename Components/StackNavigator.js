import { createStackNavigator } from '@react-navigation/stack'

import Home from '../Screen/Home';
import CalendarPage from '../Screen/CalendarPage';
import ChatGPT from '../Screen/ChatGPT';
import Memo from '../Screen/Memo';

import LogoTitle from './LogoTitle'

const Stack = createStackNavigator();

// logotitle보여주고 tab바도 바꿔주는 함수 생성
const screenOptionStyle = ({route}) => 
  ({
      tabBarLabel: route.name,
      tabBarIcon: ({ focused }) => (
        TabBarIcon(focused, route.name)
      ),
      headerStyle: {
        backgroundColor: "#d5a599",
        height : 100
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
      headerTitle:LogoTitle(route.name),
    });



const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const CalendarStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Calendar" component={CalendarPage} />
    </Stack.Navigator>
  );
}

const ChatGPTStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='ChatGPT' component={ChatGPT} />
    </Stack.Navigator>
  )
}

const MemoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='Memo' component={Memo} />
    </Stack.Navigator>
  )
}

export { HomeStackNavigator, CalendarStackNavigator, ChatGPTStackNavigator, MemoStackNavigator };