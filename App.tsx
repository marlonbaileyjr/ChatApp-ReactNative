import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import RegisterScreen from './screens/Register';
import CreateRoom from './screens/CreateRoom';
import RoomLogin from './screens/RoomLoginScreen'

import React from 'react';


const Stack = createNativeStackNavigator();
const navigator: any = createNativeStackNavigator();
const url: string = 'http://100.26.138.225:3000';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen options={{headerShown: false }} name="Login" component={LoginScreen} />
         <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
          headerRight: () => (
            <Button
              onPress={() => navigator.navigate('ChatModal')}
              title="Info"
              color="#fff"
            />
          ),
        }}/>
         <Stack.Screen name="Register" component={RegisterScreen} />
         <Stack.Screen name="CreateRoom" component={CreateRoom} />
         <Stack.Screen name="RoomLogin" component={RoomLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export { url };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
