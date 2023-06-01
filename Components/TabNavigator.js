import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';


import { HomeStackNavigator, CalendarStackNavigator, ChatGPTStackNavigator, MemoStackNavigator } from "./StackNavigator";


import TabBarIcon from '../Components/TabBarIcon';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#d3837a',
        activeTintColor: '#371f18',
        inactiveBackgroundColor: '#d5a599',
        inactiveTintColor: '#884c3e',
        style: {
          backgroundColor: '#d5a599',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        labelPosition: 'beside-icon',
        tabStyle:{height:85},
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: route.name,
        tabBarIcon: ({ focused }) =>(TabBarIcon( focused, route.name )),
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Calendar" component={CalendarStackNavigator} />
      <Tab.Screen name="ChatGPT" component={ChatGPTStackNavigator} />
      <Tab.Screen name="Memo" component={MemoStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
