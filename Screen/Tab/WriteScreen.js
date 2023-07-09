import React, {useState} from 'react';
import {Alert, Text, View, TextInput, Button, StyleSheet} from 'react-native';
import {NET_IP} from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    fontSize: 24,
    textAlignVertical: 'top',
  },
  content: {
    width: '100%',
    height: '82%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

const WriteScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const savePost = async () => {
    if (title == '' || content == '') {
      Alert.alert('경고', '다시 입력해주세요');
    } else {
      fetch(NET_IP + 'write', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
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
    }
  };

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
