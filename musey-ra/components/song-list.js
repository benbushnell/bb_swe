import { StyleSheet, Text, View, Button, Dimensions, FlatList, List, SearchBar } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import LoginOrCreateForm from './login-or-create-account';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

function SongList(props) {
    const {listStyle} = style
    const [songsList, setSongsList] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const navigation = useNavigation()

    console.log("Auth Header")
    console.log(axios.defaults.headers.common.Authorization)

    function baseHttp() {
        return axios.create({
          baseURL: "http://127.0.0.1:8000/musey/api",
          headers: axios.defaults.headers.common.Authorization
        })
      }

    function getSongsList() {
        baseHttp().get('songs/')
        .then(response => 
            console.log(response.data)
            )
        .catch(e => {
            console.log("this");
            });
    }

    useEffect(() => {
        async function fetchSongs() {
            const res = await fetch("http://127.0.0.1:8000/musey/api/songs");
            res.json()
           .then(res => setSongsList(res.response))
           .catch(err => console.log(err));
          }
          fetchSongs();
       },[])

    const handleRefresh = () => {
        getSongsList()
      };
    
    const renderSeparator = () => {
        return(
            <View
            style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                marginLeft: "14%",
                marginTop: "3%"
            }}
            />
        );
    };

    const renderHeader = () => {
        return(<Text>Fuck</Text>
        // <SearchBar placeholder="Type Here..." lightTheme round />
        );
    };

    getSongsList()
    return (
      <View style={listStyle}>
        <Text>Song List</Text>
            <FlatList
            data={songsList}
            renderItem={({ song }) => (
                <ListItem
                //   onPress={() => this.props.navigation.navigate('Detail',
                //   {name: `${item.name}`, menu: `${item.menu}`,
                //   img: `${this.state.base_url}${item.photo}`,
                //   address: `${item.address}`})}
                //   avatar={<Avatar
                //           source={{uri: `${this.state.base_url}${item.photo}`}}
                //           onPress={() => console.log("Works!")}
                //           containerStyle={{marginBottom: 2}}
                //           avatarStyle={{resizeMode: "cover"}}
                //           width={140}
                //           height={130}
                //     />}
                title={`${song.song_title}`}
                titleStyle={{ fontSize: 16}}
                titleContainerStyle = {{ marginLeft: 120 }}
                subtitle={<View style={styles.subtitleView}>
                <Text style={styles.menuText}>{song.artist_name}</Text>
                <Text style={styles.locText}>{song.avgRating}</Text>
                </View>}
                containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
                />
            )}
            keyExtractor={song => song.id}
            ItemSeparatorComponent={renderSeparator()}
            ListHeaderComponent={renderHeader()}
            onRefresh={handleRefresh()}
                refreshing={refreshing}
            />
        <Button
          title="Add a Song"
          onPress={() => navigation.navigate('Add Song')}
        />
      </View>
    );
  }

  const style = StyleSheet.create({
    listStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width
    },
    subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5,
        marginLeft: 110
      },
      menuText: {
        paddingLeft: 10,
        color: 'grey'
      },
      locText: {
        paddingLeft: 10,
        color: 'grey',
        marginTop: 6,
        fontSize: 12
      },
  });

export {SongList};