import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const renderRadioButton = (value, label, gender) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 50,
    }}
  >
    <View
      style={{
        marginRight: 8,
        width: 16,
        height: 16,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: gender === value ? '#E5E5E5' : 'gray',
        backgroundColor: gender === value ? 'darkgray' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      {gender === value && (
        <View
          style={{
            width: 7,
            height: 7,
            borderRadius: 5,
            backgroundColor: 'white',
          }}
        />
      )}
    </View>
    <Text>{label}</Text>
  </View>
);

export default function FormUpdate({ name, phone, email, gender, avatar, handleEmailChange }) {
  const [isVisible, setVisible] = useState(false);
  const [image, setImage] = useState(avatar);
  const uploadImage = async (mode) => {
    try {
      let result = {};
      if (mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
      }
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setVisible(false);
      }
    } catch (error) {
      alert("Error: " + error.message);
      setVisible(false);
    }
  };
  const close = () => {
    setVisible(false);
  };

  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-evenly', height: '70%' }}>
      <View style={{
        width: '30%', height: '27%', borderWidth: 0.2, alignItems: 'center', justifyContent: 'center',
        borderRadius: 100, borderColor: 'gray', backgroundColor: 'gray'
      }}>
        <Image style={{ width: '99%', height: '99%', resizeMode: 'stretch', borderRadius: 100, position: 'absolute' }}
          source={{ uri: image || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/800px-Unknown_person.jpg" }} />
        <TouchableOpacity style={{
          width: '20%', height: '20%', left: '50%', backgroundColor: '#999900', borderRadius: 100,
          alignItems: 'center', justifyContent: 'center',
        }} onPress={() => setVisible(true)}>
          <Image style={{ width: '60%', height: '60%', tintColor: 'white' }} source={require('../Views/Image/icon_camera.png')} />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isVisible}
          onRequestClose={() => {
            setVisible(false);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', }}>

            <View style={{
              backgroundColor: 'white', borderTopWidth: 0.1, borderRadius: 30, height: '25%', margin: 20,
              shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.7
            }}>
              <TouchableOpacity onPress={() => uploadImage('')} style={{ height: '25%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2, }}>
                <Text style={{ fontSize: 20, color: 'purple' }}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => uploadImage('gallery')} style={{ height: '25%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2, borderBottomWidth: 0.2 }}>
                <Text style={{ fontSize: 20, color: 'purple' }}>Thư viện</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={close} style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'purple' }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ width: '88%', height: 45, backgroundColor: '#E5E5E5', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray' }}>
        <TextInput
          style={{ width: '100%', height: '100%', marginLeft: '4%', fontSize: 16, color: 'gray' }}
          value={name}
          editable={false}
        />
      </View>
      <View style={{ width: '88%', height: 45, backgroundColor: '#E5E5E5', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray' }}>
        <TextInput
          style={{ width: '100%', height: '100%', marginLeft: '4%', fontSize: 16, color: 'gray' }}
          value={phone}
          editable={false}
        />
      </View>
      <View style={{ width: '88%', height: 45, backgroundColor: '#E5E5E5', borderRadius: 4, borderWidth: 0.2, borderColor: 'gray' }}>
        <TextInput
          style={{ width: '100%', height: '100%', marginLeft: '4%', fontSize: 16, color: 'gray' }}
          value={email}
          editable={false}
        />
      </View>
      <View style={{ width: '88%', height: '10%', justifyContent: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          {renderRadioButton('male', 'Nam', gender)}
          {renderRadioButton('female', 'Nữ', gender)}
          {renderRadioButton('undefined', 'Chưa xác định', gender)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
