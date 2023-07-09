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
          if (response.ok) {
            return response.json();
          } else {
            console.error(response.status);
            throw new Error('서버에서 실패 상태 코드를 반환했습니다.');
          }
        })
        .then(responseData => {
          console.log(JSON.stringify(responseData));
          return navigation.navigate('TabNavigation');
        })
        .catch(error => {
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
