import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import React from 'react'
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  //const {roomName, username} = useRoute().params
  

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
      
    </KeyboardAvoidingView>
  )
}

export default ChatScreen

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