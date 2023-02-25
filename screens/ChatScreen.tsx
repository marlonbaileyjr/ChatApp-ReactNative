import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

export default function ChatScreen() {
    type RoomParams = {
        username: string;
        roomName: string;
      }
      
      const route = useRoute<RouteProp<Record<string, RoomParams>, string>>();
      const { username, roomName } = route.params;
      const navigation= useNavigation();
      
      useEffect(() => {
        navigation.setOptions({ title: roomName })
      }, [])

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    'Hello!',
    'How are you?',
    'I am fine, thanks. And you?',
    'I am good too.',
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.messagesContainer, { marginBottom: '25%' }]} // add marginBottom style
      >
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.message}>{msg}</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSend} >
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
    flexGrow: 1,
    justifyContent: 'flex-end',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: "1%",
    left: 0,
    right: 0,
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
});
