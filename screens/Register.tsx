import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { url } from '../App';

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigation: any = useNavigation();

  async function registerUser() {
    
    const result = await fetch(`${url}/api/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, 
            password
        })
    }).then(res => res.json());
    
    if(result.status==='ok'){
        alert('User registered successfully');
        navigation.navigate('LoginScreen');
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
            placeholder="username" 
            value={username}
            onChangeText={text => setUsername(text)} 
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
        onPress={registerUser}
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