import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import NewJobs from '../screens/NewJobs';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="NewJobs" component={NewJobs} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
