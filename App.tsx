import { NavigationContainer, useRoute,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import RegisterScreen from './screens/Register';
import CreateRoom from './screens/CreateRoom';
import RoomLogin from './screens/RoomLoginScreen'
import { FontAwesome } from '@expo/vector-icons';
import ChatModal from './screens/ChatModal';

import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  //const roomName = useRoute().params
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen options={{headerShown: false }} name="Login" component={LoginScreen} />
         <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Info" component={ChatModal} />
         </Stack.Group>
         <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ navigation }) => ({
          //title: {roomName},
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Info')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome 
                name="info-circle"
                size={24}
                color= {Colors.black}
                style={{marginRight: 15}}
              />
            </Pressable>
          )})}/>
         <Stack.Screen name="Register" component={RegisterScreen} />
         <Stack.Screen name="CreateRoom" component={CreateRoom} />
         <Stack.Screen name="RoomLogin" component={RoomLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
