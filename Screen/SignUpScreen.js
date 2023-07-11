import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {NET_IP} from '@env';
import UserContext from "../UserContext";

function SignUpScreen({navigation}) {
  const { globalUserId, setGlobalUserId } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const realSignUp = async () => {
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
        if (response.status === 200) {
          // 회원가입에 성공했을 경우의 처리
          Alert.alert('축하', '회원가입이 완료되었습니다');
          setGlobalUserId(userId);
          return navigation.navigate('TabNavigation', {isKakaoLogin: false});
          // return response.json();
        } else if (response.status === 400) {
          // 이미 존재하는 사용자일 경우의 처리
          Alert.alert('경고', '이미 존재하는 사용자입니다');
          return response.json();
        } else if (response.status === 500) {
          // 서버 오류로 인해 회원가입에 실패한 경우의 처리
          Alert.alert('경고', '회원가입에 실패했습니다');
          return response.json();
        }
      })
      .catch(error => {
        // 네트워크 오류 등 다른 이유로 인한 실패 시 처리
        console.error('Error:', error);
      });
  };

  const onSignUp = async () => {
    if (userId == '' || password == '' || username == '') {
      Alert.alert('경고', '다시 입력해주세요');
    } else {
      Alert.alert('알림', '회원가입 하시겠습니까?', [
        {text: '취소', onPress: () => null, style: 'cancel'},
        {text: '예', onPress: () => realSignUp()},
      ]);
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
