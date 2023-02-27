import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import io from 'socket.io-client'
import url from '../utils/url'
const socket = io(url);

export default function ChatScreen() {
  type message = {
    username: string;
    text: string;
    time: string;
  };

  type RoomParams = {
    username: string;
    roomName: string;
  };

  const route = useRoute<RouteProp<Record<string, RoomParams>, string>>();
  const { username, roomName } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: roomName })
  }, [])

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<message[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      return `${hours < 10 ? '0': ''}${hours}:${minutes < 10 ? '0': ''}${minutes}`;
    }
  

    
  
  const handleSend = () => {
    const messageObject = {
      username: username,
      text: message,
      time: getCurrentTime()
    } 

    const newMessages = [...messages, messageObject];
    setMessages(newMessages);
    setMessage('');
    socket.emit('chatMessage', messageObject);
  };

 

  //WEBSOCKET
  useEffect(() => {

  socket.emit('joinRoom', { username, roomName });

  socket.on('message', (msg: message) => {
    console.log(msg)
    setMessages([...messages, msg]);
  })
}, [])

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContentContainer}
      >
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.msgUsername}>{msg.username}</Text>
            <Text style={styles.message}>{msg.text}</Text>
            <Text style={styles.msgTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContentContainer: {
    paddingBottom: '25%',
  },
  messageContainer: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 16,
  },
  msgUsername: {
    fontSize: 12,
  },
  msgTime: {
    fontSize: 12,
    color: '#666',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    textAlignVertical: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    width: '100%',
  },
  button:{
    backgroundColor: '#0782f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:20
},
buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16
},
})
