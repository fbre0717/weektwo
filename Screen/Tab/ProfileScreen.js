import React, {useState} from 'react';
import {
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NET_IP} from '@env';

function ProfileScreen({route}) {
  const { isKakaoLogin } = route.params;

  const [username, setUsername] = useState('오현');
  const [userbirth, setUserbirth] = useState('1990년 4월 1일');
  const [userhobby, setUserhobby] = useState('독서, 여행, 요리');

  const [modalVisible, setModalVisible] = useState(false);
  const [editingModal, setEditingModal] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [newFieldValue, setNewFieldValue] = useState('');

  const openModal = field => {
    setFieldToEdit(field);
    setModalVisible(true);
  };

  const initModal = () => {
    setModalVisible(false);
    setEditingModal(false);
    setFieldToEdit(null);
    setNewFieldValue('');
    console.log(isKakaoLogin);
  };

  const getModalTitle = () => {
    switch (fieldToEdit) {
      case 'name':
        return '이름을 변경하시겠습니까?';
      case 'birth':
        return '생일을 변경하시겠습니까?';
      case 'hobby':
        return '취미를 변경하시겠습니까?';
      default:
        return '';
    }
  };

  const getModalPlaceHolder = () => {
    switch (fieldToEdit) {
      case 'name':
        return '이름을 입력하세요';
      case 'birth':
        return '생일을 입력하세요';
      case 'hobby':
        return '취미를 입력하세요';
      default:
        return '';
    }
  };

  const updateServerInfo = async (field, newValue) => {
    console.log(NET_IP + 'profile/' + field);

    fetch(NET_IP + 'profile/' + field, {
      method: 'POST', // 서버에 맞는 HTTP 메소드를 사용하세요.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [field]: newValue,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          switch (field) {
            case 'name':
              setUsername(newValue);
              break;
            case 'birth':
              setUserbirth(newValue);
              break;
            case 'hobby':
              setUserhobby(newValue);
              break;
            default:
              break;
          }
        } else {
          // 오류 처리
          console.error('서버에서 오류가 발생했습니다.');
        }
      })
      .catch(error => {
        // 네트워크 오류 등 다른 이유로 인한 실패 시 처리
        console.error('Error:', error);
      });
  };

  const saveEditedInfo = async newValue => {
    if (newValue == '') {
      Alert.alert('경고', '다시 입력해주세요');
    } else {
      await updateServerInfo(fieldToEdit, newValue);
      initModal();
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackDrop}>
          <View style={styles.modalContent}>
            {!editingModal ? (
              //editingModal이 false이므로 변경할 것인지를 물어본다.
              <>
                <Text style={styles.modalText}>{getModalTitle()}</Text>
                <View style={styles.modalButtons}>
                  {/* 예를 누르면 editingModal을 true로 설정하여 editmodal로 변경한다. */}
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setEditingModal(!editingModal);
                    }}>
                    <Text style={styles.modalButtonText}>예</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={initModal}>
                    <Text style={styles.modalButtonText}>아니요</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              //editingModal이 true이므로 저장할 것인지 물어본다.
              <>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder={getModalPlaceHolder()}
                  onChangeText={text => setNewFieldValue(text)}
                  value={newFieldValue}
                />
                <View style={styles.modalButtons}>
                  {/* 저장을 누르면 editingModal을 false로 설정하여 원래 상태로 되돌아간다. */}
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      saveEditedInfo(newFieldValue);
                    }}>
                    <Text style={styles.modalButtonText}>저장</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={initModal}>
                    <Text style={styles.modalButtonText}>취소</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Text style={styles.header}>Profile</Text>
      <Image
        style={styles.profileImage}
        // source={{uri: 'https://via.placeholder.com/300'}}
        source={{uri: 'https://k.kakaocdn.net/dn/rVsuh/btsnhdJPoCo/SZkYKHemVFzL9pTPJO2jDK/img_640x640.jpg'}}
        
      />
      <View style={styles.profileInfo}>
        <MaterialIcons name="face" size={24} color="#4682B4" />
        <Text style={styles.infoLabel}>이름 </Text>
        <TouchableOpacity onPress={() => openModal('name')}>
          <Text style={styles.infoValue}>{username}</Text>
        </TouchableOpacity>
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
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: width * 0.1,
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
});

export default ProfileScreen;
