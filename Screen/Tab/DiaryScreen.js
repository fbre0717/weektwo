import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  diaryItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    fontSize: 16,
    paddingTop: 5,
  },
});

const diaryDB = [
  {
    id: 1,
    title: '첫 번째 게시글',
    content:
      '첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.',
  },
  {
    id: 2,
    title: '두 번째 게시글',
    content:
      '두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.',
  },
  {
    id: 3,
    title: '세 번째 게시글',
    content:
      '세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.',
  },
  {
    id: 4,
    title: '네 번째 게시글',
    content:
      '네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.',
  },
];

const DiaryScreen = ({navigation}) => {
  const DiaryItems = ({data}) => {
    return (
      <View style={styles.diaryItem}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DiaryDetail', {data: data})
          }>
          <Text style={styles.title}>{data.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View>
        {diaryDB.map((data, index) => (
          <DiaryItems key={index} data={data} />
        ))}
      </View>
    </ScrollView>
  );
};

export default DiaryScreen;
