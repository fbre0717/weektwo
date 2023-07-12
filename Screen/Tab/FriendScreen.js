import React, {useState, useEffect, useContext} from 'react';
import {FAB} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {NET_IP} from '@env';
import UserContext from '../../UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center', // 컨테이너의 가로 중앙에 있는 텍스트를 정렬
  },
  diaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  circleImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  modalView: {
    marginTop: '40%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    width: 100,
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  modalBackDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 창 바깥 부분이 어두워지도록 함.
  },
  modalContent: {
    width: 300,
    minHeight: 100,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

const FriendScreen = ({navigation}) => {
  const {globalUserId, setGlobalUserId} = useContext(UserContext);
  const [friendDB, setFriendDB] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [friendId, setFriendId] = useState('');

  const fetchFriendDB = async () => {
    setLoading(true);

    fetch(NET_IP + 'show_all_friend', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: globalUserId,
      }),
    })
      .then(async response => {
        if (response.status === 200) {
          const responseData = await response.json();
          console.log(responseData); // 여기에서 JSON 형식의 응답 body가 출력됩니다.
          setFriendDB(responseData);
          setLoading(false);
          return responseData;
        } else if (response.status === 500) {
          setLoading(false);
          return response.json();
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  const addFriend = () => {
    // 여기에서 친구를 추가하는 API를 호출하십시오.
    fetch(NET_IP + 'add_friend', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: globalUserId,
        follow: friendId,
      }),
    })
    .then(async response => {
      const responseData = await response.json(); // 응답 데이터를 받아옵니다.

      if (response.status === 200) {
        console.log(responseData);
        // 친구 추가가 완료되었습니다.
        alert(responseData.message);
        setModalVisible(false);
        setFriendId('');
      } else if (response.status === 400) {
        console.log(responseData);
        // 이미 친구 리스트에 있는 친구 또는 user_id 없음에 대한 처리
        alert(responseData.message);
        setModalVisible(false);
        setFriendId('');
      } else if (response.status === 500) {
        console.log(responseData);
        // 서버 오류로 인한 실패 처리
        alert(responseData.message);
      }
    })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
      });
    // setModalVisible(false);
    // setFriendId('');
  };

  const closeModal = () => {
    setModalVisible(false);
    setFriendId('');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("friend");
      fetchFriendDB();
    });

    // 컴포넌트가 언마운트될 때 동작합니다.
    return unsubscribe;
  }, [navigation]);

  const FriendItems = ({data}) => {
    return (
      <View style={styles.diaryItem}>
        <Image
          style={styles.circleImage}
          source={{uri: data.imageUrl}}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FriendDetailScreen', {data: data})
          }>
          <Text style={styles.title}>
            {data.userId}({data.username})
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
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
              {friendDB.map((data, index) => (
                <FriendItems key={index} data={data} />
              ))}
            </View>
          </ScrollView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalBackDrop}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>친구 추가</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="아이디를 입력하세요"
                  onChangeText={text => setFriendId(text)}
                  value={friendId}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      addFriend();
                      fetchFriendDB();
                    }}>
                    <Text style={styles.modalButtonText}>추가</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={closeModal}>
                    <Text style={styles.modalButtonText}>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => setModalVisible(true)} // 수정: 모달이 표시되도록 변경
          />
        </>
      )}
    </View>
  );
};

export default FriendScreen;
