import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  BackHandler,
} from 'react-native';
import {NET_IP} from '@env';
import UserContext from "../../UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    textAlignVertical: 'top',
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    width: '100%',
  },
});

const WriteScreen = ({navigation}) => {
  const {globalUserId, setGlobalUserId} = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const realSavePost = async () => {
    fetch(NET_IP + 'write', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        userId: globalUserId,
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
        // 성공
        console.log(JSON.stringify(responseData));
        console.log(title, content);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const savePost = async () => {
    if (title == '' || content == '') {
      Alert.alert('경고', '다시 입력해주세요');
    } else {
      Alert.alert('알림', '저장하시겠습니까?', [
        {text: '취소', onPress: () => null, style: 'cancel'},
        {text: '예', onPress: () => realSavePost()},
      ]);
    }
  };

  const backAction = () => {
    Alert.alert('알림', '저장하지 않고 나가시겠습니까?', [
      {text: '취소', onPress: () => null, style: 'cancel'},
      {text: '예', onPress: () => navigation.goBack()},
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        onChangeText={text => setTitle(text)}
        value={title}
        placeholder="제목을 입력하세요"
      />
      <TextInput
        style={styles.content}
        onChangeText={text => setContent(text)}
        value={content}
        placeholder="내용을 입력하세요"
        multiline
        // numberOfLines={5}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save Post" onPress={() => savePost()} />
      </View>
    </View>
  );
};

export default WriteScreen;
