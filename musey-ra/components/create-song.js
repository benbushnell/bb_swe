import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import {SongList} from './song-list';
import SongsList from './songs-list-class';


function AddSongScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Add Song Screen</Text>
        <SongsList />
        <Button
        title="Submit and go back"
        onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

export default AddSongScreen;