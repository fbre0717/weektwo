import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NET_IP} from '@env';
import UserContext from '../../UserContext';

function FriendDetailScreen({route, navigation}) {
  const {data} = route.params;
  // console.log(route.params);

  const {globalUserId, setGlobalUserId} = useContext(UserContext);
  const {isKakaoLogin} = route.params;
  const [loading, setLoading] = useState(false);

  const [userimage, setUserimage] = useState('https://via.placeholder.com/300');
  const [username, setUsername] = useState('친구 이름');
  const [userbirth, setUserbirth] = useState('친구 생일');
  const [userhobby, setUserhobby] = useState('친구 취미');

  const getKakaoProfile = () => {
    KakaoLogin.getProfile()
      .then(result => {
        // console.log('GetProfile Success', JSON.stringify(result));
        // console.log(
        //   result.id,
        //   result.nickname,
        //   result.birthday,
        //   result.profileImageUrl,
        // );
        setGlobalUserId(result.id);
        setUserimage(result.profileImageUrl);
        setUsername(result.nickname);
        setUserbirth(result.birthday);
      })
      .catch(error => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  const getProfile = async () => {
    try {
      const response = await fetch(NET_IP + 'show_profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: data.userId,
        }),
      });

      if (response.status === 200) {
        const newdata = await response.json();
        console.log(newdata);
        setUserhobby(newdata.hobby);
        setUsername(newdata.username);
        setUserbirth(newdata.birth);
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData.message);
        Alert.alert('Error', errorData.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Fetch request failed.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isKakaoLogin) {
        setLoading(true);
        getKakaoProfile();
        setLoading(false);
      } else {
        setLoading(true);
        getProfile();
        setLoading(false);
        //kakao 아닌 getProfile
        console.log('NoKAKAO');
      }
    });

    // 컴포넌트가 언마운트될 때 동작합니다.
    return unsubscribe;
  }, [navigation]);


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
            <View style={styles.zz}>
              <Text style={styles.header}>Profile</Text>
              <Image
                style={styles.profileImage}
                source={{uri: data.imageUrl}}
                // source={{uri: 'https://k.kakaocdn.net/dn/rVsuh/btsnhdJPoCo/SZkYKHemVFzL9pTPJO2jDK/img_640x640.jpg'}}
              />
              <View style={styles.profileInfo}>
                <MaterialIcons name="face" size={24} color="#4682B4" />
                <Text style={styles.infoLabel}>회원 </Text>
                <Text style={styles.infoValue}>{data.userId}</Text>
              </View>
              <View style={styles.profileInfo}>
                <MaterialIcons name="face" size={24} color="#4682B4" />
                <Text style={styles.infoLabel}>이름 </Text>
                <Text style={styles.infoValue}>{username}</Text>
              </View>
              <View style={styles.profileInfo}>
                <MaterialIcons name="cake" size={24} color="#4682B4" />
                <Text style={styles.infoLabel}>생일 </Text>
                <TouchableOpacity onPress={() => openModal('birth')}>
                  <Text style={styles.infoValue}>{userbirth}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <MaterialIcons name="palette" size={24} color="#4682B4" />
                <Text style={styles.infoLabel}>취미 </Text>
                <TouchableOpacity onPress={() => openModal('hobby')}>
                  <Text style={styles.infoValue}>{userhobby}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    // paddingHorizontal: width * 0.1,
    paddingTop: height * 0.03,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: '#4682B4',
    alignSelf: 'center',
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignSelf: 'center',
    borderColor: '#4682B4',
    borderWidth: 3,
    marginVertical: 20,
    marginBottom: height * 0.06,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.03,
    justifyContent: 'flex-start',
  },
  infoLabel: {
    marginLeft: width * 0.03,
    fontSize: 20,
    color: '#778899',
  },
  infoValue: {
    fontSize: 20,
    marginLeft: width * 0.01, // 여백을 더 줍니다.
    color: '#2F4F4F',
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
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
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
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  midcontainer: {
    flex: 1,
    justifyContent: 'center', // 컨테이너의 수직 중앙에 있는 텍스트를 정렬
    alignItems: 'center', // 컨테이너의 가로 중앙에 있는 텍스트를 정렬
  },
  zz: {
    paddingHorizontal: width * 0.1,
  },
});

export default FriendDetailScreen;
