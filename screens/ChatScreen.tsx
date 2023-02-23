import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import React from 'react'
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const {roomName, username} = useRoute().params
  

  return (
    <KeyboardAvoidingView>
      <Header>{`${roomName}`}</Header>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})