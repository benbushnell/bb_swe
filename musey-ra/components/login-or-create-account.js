import React, { Component, useEffect, useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


function baseHttp() {
    return axios.create({
      baseURL: "http://127.0.0.1:8000/musey/api",
    })
  }

function LoginOrCreateForm(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    
    // state = {
    //   username: '',
    //   password: '',
    //   firstName: '',
    //   lastName: ''
    // }
  
    // useEffect(() => {
    //     setUsername(username);
    //     setPassword(password);
    //     console.log(username)
    // })
  
    // const renderCreateForm = () => {
    //   const { fieldStyle, textInputStyle } = style;
    //   if (this.props.create) {
    //     return (
    //         <View style={fieldStyle}>
    //           <TextInput
    //             placeholder="First name"
    //             autoCorrect={false}
    //             onChangeText={this.onFirstNameChange.bind(this)}
    //             style={textInputStyle}
    //           />
    //           <TextInput
    //             placeholder="Last name"
    //             autoCorrect={false}
    //             onChangeText={this.onLastNameChange.bind(this)}
    //             style={textInputStyle}
    //           />
    //         </View>
    //     );
    //   }
    // }
  
    const renderButton = () => {
      const buttonText = props.create ? 'Create' : 'Login';
  
      return (
        <Button title={buttonText} onPress={() => handleRequest()}/>
      );
    }

    const handleRequest = () => {
        // setUsername(username)
        // setPassword(password)
        const endpoint = props.create ? 'register/' : 'login/';
        const payload = { username: username, password: password } 
        console.log(payload)

        baseHttp().post(endpoint, payload)
        .then(response => {
        const { token, user } = response.data;
    
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        
        // Navigate to the add song screen
        navigation.navigate('Add Song');
        })
        .catch(error => console.log(error));
      }
  
  
    
    const renderCreateLink = () => {
      if (!props.create) {
        const { accountCreateTextStyle } = style;
        return (
          <Text style={accountCreateTextStyle}>
            Or 
            <Text style={{ color: 'blue' }} onPress={() => Actions.register()}>
              {' Sign-up'}
            </Text>
          </Text>
        );
      }
    }

    const style = StyleSheet.create({
        formContainerStyle: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: Dimensions.get('window').width
        },
        textInputStyle: {
          flex: 1,
          padding: 15
        },
        fieldStyle: {
          flexDirection: 'row',
          justifyContent: 'center'
        },
        buttonContainerStyle: {
          flex: 1,
          justifyContent: 'center',
          padding: 25
        },
        accountCreateTextStyle: {
          color: 'black'
        },
        accountCreateContainerStyle: {
          padding: 25,
          alignItems: 'center'
        }
      });
  
    // render() {
    const {
        formContainerStyle,
        fieldStyle,
        textInputStyle,
        buttonContainerStyle,
        accountCreateContainerStyle
    } = style;
  
    return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={formContainerStyle}>
        <View style={fieldStyle}>
            <TextInput
            placeholder="username"
            autoCorrect={false}
            autoCapitalize="none"
            value = {username}
            onChangeText={text => setUsername(text)}
            // event => setUsername(event.target.value)
            style={textInputStyle}
            />
        </View>
        <View style={fieldStyle}>
            <TextInput
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={textInputStyle}
            />
        </View>
        {/* {renderCreateForm()} */}
        </View>
        <View style={buttonContainerStyle}>
        {renderButton()}
        <View style={accountCreateContainerStyle}>
            {renderCreateLink()}
        </View>
        </View>
    </View>
    );

};
  
  
  export default LoginOrCreateForm;