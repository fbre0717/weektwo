import React, { useContext } from "react";
import UserContext from "../../UserContext";
import {ScrollView, Text, View} from 'react-native';

function FriendScreen() {
  const { globalUserId, setGlobalUserId } = useContext(UserContext);

  console.log(globalUserId);
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

export default FriendScreen;
