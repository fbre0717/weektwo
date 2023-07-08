import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
        <Text style={{fontSize: 24}}>Settings!</Text>
      </View>
    </ScrollView>
  );
}

function ChatRoomsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ChatRooms!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="ChatRooms" component={ChatRoomsScreen} />
      </Tab.Navigator>
  );
}
