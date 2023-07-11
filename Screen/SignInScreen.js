import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {NET_IP} from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});

function SignInScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    if (userId == '' || password == '') {
      Alert.alert('경고', '다시 입력해주세요');
    } else {
      fetch(NET_IP + 'signIn', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
      })
        .then(response => {
          // console.log(response.json());
          if (response.status === 200) {
            // 로그인 성공 처리
            Alert.alert('축하', '로그인이 완료되었습니다');
            return navigation.navigate('TabNavigation');
            // return response.json();
          } else if (response.status === 400) {
            // 비밀번호 불일치 처리
            Alert.alert('경고', '비밀번호가 일치하지 않습니다');
            return response.json();
          } else if (response.status === 404) {
            // 사용자를 찾을 수 없음 처리
            Alert.alert('경고', '사용자가 존재하지 않습니다');
            return response.json();
          } else if (response.status === 500) {
            // 서버 오류 처리
            return response.json();
          }
        })
        .catch(error => {
          // 네트워크 오류 또는 기타 오류 처리
          console.error('Error:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>로그인</Text>
      <Text>{'\n'}</Text>
      <TextInput
        style={styles.content}
        onChangeText={text => setUserId(text)}
        value={userId}
        placeholder="아이디를 입력하세요"
      />
      <Text>{'\n'}</Text>
      <TextInput
        style={styles.content}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
      />
      <Text>{'\n'}</Text>
      <Button title="로그인" onPress={onSignIn} />
    </View>
  );
}

export default SignInScreen;
