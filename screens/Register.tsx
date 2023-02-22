import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder="Email" 
            value={email}
            onChangeText={text => setEmail(text)} 
            style={styles.input}
            />
            <TextInput 
            placeholder="Password" 
            value={password}
            onChangeText={text => setPassword(text)} 
            style={styles.input}
            secureTextEntry
            />
         </View>

        <TouchableOpacity 
        style={styles.button}
        //onPress={handleSignUp}
        >
            <Text style={styles.buttonText} >Register</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Register

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