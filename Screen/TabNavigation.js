import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BackHandler, Alert} from 'react-native';

import ProfileScreen from './Tab/ProfileScreen';
import DiaryScreen from './Tab/DiaryScreen';
import FriendScreen from './Tab/FriendScreen';

const TabNavigator = createBottomTabNavigator();

export default function TabNavigation({route, navigation}) {
  const {isKakaoLogin} = route.params;

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('로그아웃', '로그아웃하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => navigation.navigate('DefaultScreen'),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

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
