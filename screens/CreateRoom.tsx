import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { url } from '../App';

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('')
    const [roomPassword, setRoomPassword] = useState('')
    const navigation: any = useNavigation();
    const username = useRoute().params;


    async function createRoom() {        
        const result = await fetch(`${url}/api/create-room`,{
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
            alert('Room Created successfully');
            navigation.navigate("RoomLogin", {username: username})
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

        <TouchableOpacity
        style={styles.button}
        onPress={createRoom}
        >
            <Text style={styles.buttonText} >Create Room</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default CreateRoom

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop:20
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