import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {NET_IP} from '@env';

function SignUpScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    if (userId == '' || password == '' || username == '') {
      Alert.alert('경고', '다시 입력해주세요');
    } else {
      fetch(NET_IP + 'signUp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
          username: username,
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error(response.status);
            throw new Error('서버에서 실패 상태 코드를 반환했습니다.');
          }
        })
        .then(responseData => {
          // console.log(JSON.stringify(responseData));
          console.log(responseData['message']);
          if (responseData['message'] == '회원 가입에 성공하였습니다.') {
            Alert.alert('축하', '회원가입이 완료되었습니다');
            return navigation.navigate('TabNavigation');
          } else {
            Alert.alert('경고', '회원가입에 실패했습니다');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>회원가입</Text>
      <Text>{'\n'}</Text>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
        }}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="이름을 입력하세요"
      />
      <Text>{'\n'}</Text>
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
        placeholder="아이디를 입력하세요"
      />
      <Text>{'\n'}</Text>
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
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
      />
      <Text>{'\n'}</Text>
      <Button title="회원가입" onPress={onSignUp} />
    </View>
  );
}

export default SignUpScreen;