import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileScreen from './Tab/ProfileScreen';
import DiaryScreen from './Tab/DiaryScreen';
import FriendScreen from './Tab/FriendScreen';

const TabNavigator = createBottomTabNavigator();
// TabNavigation.js

export default function TabNavigation({route}) {
  const {isKakaoLogin} = route.params;
  return (
    <TabNavigator.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarLabelStyle: {
          fontSize: 18, // 라벨 글씨 크기를 조절하세요.
          marginBottom: 10, // 라벨의 위치를 원하는대로 조절하세요.
        },
      }}>
      <TabNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{isKakaoLogin}}
      />
      <TabNavigator.Screen name="DiaryScreen" component={DiaryScreen} />
      <TabNavigator.Screen name="FriendScreen" component={FriendScreen} />
    </TabNavigator.Navigator>
  );
}
