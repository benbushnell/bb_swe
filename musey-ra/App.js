import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/home';
import AddSongScreen from './components/create-song';
import axios from 'axios';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="Add Song" 
          component={AddSongScreen} 
          options={{ title: 'Add Song' }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
