import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://your-backend-url/api/send-message', { message });
      console.log(response.data);
      // Handle success or show a confirmation to the user
    } catch (error) {
      console.error('Error sending message:', error.message);
      // Handle error
    }
  }

  useEffect(() => {
    // Request notification permissions
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        // Listener for receiving notifications while the app is in the foreground
        Notifications.addNotificationReceivedListener(handleNotification);
      }
    })();

    return () => {
      // Cleanup the notification listener
      Notifications.removeNotificationSubscription(handleNotification);
    };
  }, []);

  const handleNotification = (notification) => {
    console.log('Received a notification:', notification);
  };

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default App;