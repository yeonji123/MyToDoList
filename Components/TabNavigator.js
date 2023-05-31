// npm i @react-navigation/bottom-tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Main from '../Screen/Main'
import CalendarPage from '../Screen/Calendarpage'
import ChatGPT from '../Screen/ChatGPT'
import Memo from '../Screen/Memo'

import TabBarIcon from '../Components/TabbarIcon'


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return(
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: 'skyblue',
        activeTintColor: 'blue',
        inactiveBackgroundColor: 'yellow',
        style: {
          backgroundColor: '#c6cbef'
        },
        labelPosition: 'beside-icon'
      }}
      screenOptions= {({route}) => ({
          tabBarLabel:route.name,
          tabBarIcon:({focused}) => (
            TabBarIcon(focused, route.name)
          )
        })}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Calendar" component={CalendarPage} />
      <Tab.Screen name="ChatGPT" component={ChatGPT} />
      <Tab.Screen name="Memo" component={Memo} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;