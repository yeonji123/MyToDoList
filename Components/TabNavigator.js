import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Home from '../Screen/Main';
import CalendarPage from '../Screen/CalendarPage';
import ChatGPT from '../Screen/ChatGPT';
import Memo from '../Screen/Memo';

import TabBarIcon from '../Components/TabBarIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: 'skyblue',
        activeTintColor: 'blue',
        inactiveBackgroundColor: 'yellow',
        style: {
          backgroundColor: '#c6cbef',
        },
        labelPosition: 'beside-icon',
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: route.name,
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={route.name} />,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={CalendarPage} />
      <Tab.Screen name="ChatGPT" component={ChatGPT} />
      <Tab.Screen name="Memo" component={Memo} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
