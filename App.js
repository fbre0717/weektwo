import * as React from 'react';
import {Button, View, Text, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Tabs from './Screen/TabsScreen';
import SignUpScreen from './Screen/SignUpScreen';
import SignInScreen from './Screen/SignInScreen';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>안녕</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Button
          title="시작하기"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>회원이신가요?</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Button title="로그인" onPress={() => navigation.navigate('SignIn')} />
        <Text>{'  '}</Text>
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
