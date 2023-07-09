import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './Tab/HomeScreen';
import SettingsScreen from './Tab/SettingsScreen';
import DiaryScreen from './Tab/DiaryScreen';

const TabNavigator = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="Home" component={HomeScreen} />
      <TabNavigator.Screen name="Settings" component={SettingsScreen} />
      <TabNavigator.Screen name="Diary" component={DiaryScreen} />
    </TabNavigator.Navigator>
  );
}
