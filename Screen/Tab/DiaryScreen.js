import * as React from 'react';
import {FAB} from 'react-native-paper';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
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
            navigation.navigate('DiaryDetailScreen', {data: data})
          }>
          <Text style={styles.title}>{data.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {diaryDB.map((data, index) => (
            <DiaryItems key={index} data={data} />
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('WriteScreen')}
      />
    </View>
  );
};

export default DiaryScreen;
