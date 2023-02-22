import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import CreateRoom from './CreateRoom';
import { useNavigation } from '@react-navigation/native';

const RoomLoginScreen = () => {
  const [roomName, setRoomName] = useState('')
  const [roomPassword, setRoomPassword] = useState('')

  const navigation: any = useNavigation();
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
          //onPress={Join Room}
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