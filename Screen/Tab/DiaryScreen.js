import React, {useState, useEffect} from 'react';
import {FAB} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NET_IP} from '@env';

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
  midcontainer: {
    flex: 1,
    justifyContent: 'center', // 컨테이너의 수직 중앙에 있는 텍스트를 정렬
    alignItems: 'center',     // 컨테이너의 가로 중앙에 있는 텍스트를 정렬
  },
});

// const diaryDB = [
//   {
//     id: 1,
//     title: '첫 번째 게시글',
//     content:
//       '첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.첫 번째 게시글의 내용입니다.',
//   },
//   {
//     id: 2,
//     title: '두 번째 게시글',
//     content:
//       '두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.두 번째 게시글의 내용입니다.',
//   },
//   {
//     id: 3,
//     title: '세 번째 게시글',
//     content:
//       '세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.',
//   },
//   {
//     id: 4,
//     title: '네 번째 게시글',
//     content:
//       '네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.네 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.세 번째 게시글의 내용입니다.',
//   },
// ];

const DiaryScreen = ({navigation}) => {
  const [diaryDB, setDiaryDB] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDiaryDB = async () => {
    setLoading(true);
    try {
      // API 호출을변경하려면 URL만 수정하면 됩니다.
      const response = await fetch(NET_IP + 'show_all_write');
      const data = await response.json();

      setDiaryDB(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDiaryDB();
    });

    // 컴포넌트가 언마운트될 때 동작합니다.
    return unsubscribe;
  }, [navigation]);

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
      {loading ? (
        // 다음과 같이 이미지를 로딩할 때 View 태그의 바깥쪽에 배치합니다.
        // 이렇게 하면 렌더링 시에 스크롤 뷰와 겹치지 않습니다.
        <View style={styles.midcontainer}>
          <Image
            source={require('../../Image/pngwing.com.png')} // 로컬 이미지 경로
            style={{width: 300, height: 300}}
          />
        </View>
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default DiaryScreen;
