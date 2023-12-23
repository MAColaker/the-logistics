import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Jobs from '../screens/Jobs';
import AddJobs from '../screens/AddJobs';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Jobs" component={Jobs} />
      <Tab.Screen name="AddJobs" component={AddJobs} />
    </Tab.Navigator>
  );
}
