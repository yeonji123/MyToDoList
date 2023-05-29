import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBarIcon from './TabBarIcon'
import Main from '../Screen/Main'
import CalendarComponent from '../Screen/CalendarComponent'

const Tab = createBottomTabNavigator();



const BottomTabNavigator = () => {
  return (
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
      <Tab.Screen name="" component={InfoStackNavigator} />
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Calendar" component={CalendarComponent} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;