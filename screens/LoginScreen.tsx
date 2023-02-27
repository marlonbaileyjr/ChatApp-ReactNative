import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../utils/url'

const LoginScreen = () => {  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const navigation: any = useNavigation();
  async function login (){
    
    const result = await fetch(`${url}/api/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, 
            password,
        })
    }).then(res => res.json());
    
    if(result.status==='ok'){
      AsyncStorage.setItem('token', JSON.stringify(result.data));
      console.log(JSON.parse(await AsyncStorage.getItem('token')));
        navigation.navigate('RoomLogin', {username: result.username});
        
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
          placeholder="Username" 
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={login}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={[styles.button, styles.buttonOutline]}
          >
          <Text style={styles.buttonOutineText}>Register</Text>

        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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