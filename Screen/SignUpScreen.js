import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {NET_IP} from '@env';

function SignUpScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    // 보낼 데이터를 JSON 객체로 정의합니다.
    console.log('User ID:', userId, 'Password:', password);
    const dataToSend = {
      userId: userId,
      password: password,
    };
    console.log(
      'dataToSend.User ID:',
      dataToSend.userId,
      'dataToSend.Password:',
      dataToSend.password,
    );

    // fetch api를 사용하여 서버로 데이터를 전송하는 코드를 구현합니다.
    try {
      let response = await fetch(NET_IP + 'signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      // 서버에서 돌려받은 응답을 json 형태로 파싱합니다.
      let responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>회원가입</Text>
      <Text>ID</Text>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
        }}
        onChangeText={text => setUserId(text)}
        value={userId}
      />
      <Text>{'\n'}</Text>
      <Text>비밀번호</Text>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
        }}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Text>{'\n'}</Text>
      <Button title="회원가입" onPress={onSignUp} />
    </View>
  );
}

export default SignUpScreen;
