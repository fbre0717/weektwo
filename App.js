import React, {useState} from 'react';
import {Button, View, Text, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

import {UserProvider} from './UserContext';
import TabNavigation from './Screen/TabNavigation';
import SignUpScreen from './Screen/SignUpScreen';
import SignInScreen from './Screen/SignInScreen';
import DiaryDetailScreen from './Screen/Tab/DiaryDetailScreen';
import WriteScreen from './Screen/Tab/WriteScreen';

function DefaultScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>안녕</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Button
          title="시작하기"
          onPress={() => navigation.navigate('DetailsScreen')}
        />
      </View>
    </View>
  );
}

function DetailsScreen({navigation}) {
  const login = () => {
    KakaoLogin.login()
      .then(result => {
        console.log('Login Success', JSON.stringify(result));
        navigation.navigate('TabNavigation', {isKakaoLogin: true});
      })
      .catch(error => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Login Cancel', error.message);
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message);
        }
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>회원이신가요?</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Button
          title="로그인"
          onPress={() => navigation.navigate('SignInScreen')}
        />
        <Text>{'  '}</Text>
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('SignUpScreen')}
        />
        <Text>{'  '}</Text>
        <Button
          title="비회원로그인"
          onPress={() =>
            navigation.navigate('TabNavigation', {isKakaoLogin: false})
          }
        />
        <Text>{'  '}</Text>
        <Button title="카카오로그인" onPress={() => login()} />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const [globalUserId, setGlobalUserId] = useState('fbre0717');

  return (
    <UserProvider value={{globalUserId, setGlobalUserId}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DefaultScreen">
          <Stack.Screen
            name="DefaultScreen"
            component={DefaultScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DiaryDetailScreen"
            component={DiaryDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WriteScreen"
            component={WriteScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
