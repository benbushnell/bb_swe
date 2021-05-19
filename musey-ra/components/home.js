import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React from 'react';
import LoginOrCreateForm from './login-or-create-account';

function HomeScreen({navigation}) {
    const {homeStyle} = style
    return (
      <View style={homeStyle}>
        <Text>Home Screen</Text>
        <LoginOrCreateForm create/>
        <Button
          title="Add a Song"
          onPress={() => navigation.navigate('Add Song')}
        />
      </View>
    );
  }

  const style = StyleSheet.create({
    homeStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width
    }
  });

export default HomeScreen;