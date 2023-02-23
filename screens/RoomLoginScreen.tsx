import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { url } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomLoginScreen = () => {
  const [roomName, setRoomName] = useState('')
  const [roomPassword, setRoomPassword] = useState('')

  const username = useRoute().params;

  const navigation: any = useNavigation();

  async function joinRoom() {    
    const result = await fetch(`${url}/api/join-room`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomName, 
            roomPassword,
            username
        })
    }).then(res => res.json());
    
    if(result.status==='ok'){
        AsyncStorage.setItem('token', JSON.stringify(result.data));
        
        navigation.navigate('ChatScreen', {
            roomName: roomName,
            username: username}
          );

    }else{
        alert(result.error);
    }
}
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Room Name" 
          value={roomName}
          onChangeText={text => setRoomName(text)} 
          style={styles.input}
          />
        <TextInput 
          placeholder="Password" 
          value={roomPassword}
          onChangeText={text => setRoomPassword(text)} 
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={joinRoom}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Join Room</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CreateRoom')}
          style={[styles.button, styles.buttonOutline]}
          >
          <Text style={styles.buttonOutineText}>Create Room</Text>

        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

export default RoomLoginScreen

const styles = StyleSheet.create({
container:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
},
inputContainer:{
  width: '80%'
},
input:{
  backgroundColor: 'white',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop:5
},
buttonContainer:{
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:40
},
button:{
  backgroundColor: '#0782f9',
  width: '100%',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
},
buttonOutline:{
  backgroundColor: 'white',
  marginTop: 5,
  borderColor: '#0782f9',
  borderWidth: 2
},
buttonText:{
  color: 'white',
  fontWeight: '700',
  fontSize: 16
},

buttonOutineText:{
  color: '#0782f9',
  fontWeight: '700',
  fontSize: 16
},
})