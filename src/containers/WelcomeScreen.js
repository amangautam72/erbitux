/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, AsyncStorage } from 'react-native';
import { AppHeader } from '../components/AppHeader'

import languages from '../languages'
import Colors from '../Colors/Colors';

export default class WelcomeScreen extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log("LANGUAGE === " + languages.getLanguage())
    this.getKey()
  }

  getKey = async () => {
    try {
      //const value = await AsyncStorage.getItem('USERTYPE');
      const value = await AsyncStorage.getItem('AUTH');

      if (value !== null) {
        // We have data!!
        console.log(" KEY = " + value)

        //this.props.navigation.navigate('LoginScreen')
        this.props.navigation.navigate('HomeScreen')

      } else {
        // if (Platform.OS == 'ios') {
        //     SplashScreen.hide()
        // } else {
        //     setTimeout(() => SplashScreen.hide(), 500)
        // }

      }
    } catch (error) {
      // Error retrieving data
    }
  }

  storeUserType = async (userType) => {

    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      await AsyncStorage.setItem('USERTYPE', userType.toString());

      console.log("STOREDDD")
    } catch (error) {
      console.log(error.message);
    }

    this.props.navigation.navigate('LoginScreen')
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }} >

        <ImageBackground
          style={{
            flex: 1

          }}
          source={require('../assets/BackgroundImages/default_backdrop.png')}
          resizeMode='stretch'>


          <AppHeader navigation={this.props.navigation} hideMenu={true}></AppHeader>

          <Text style={{ fontSize: 30, fontFamily: 'BRANDING-MEDIUM', textAlign: 'center', marginTop: 40 }}>{languages.welcome}</Text>
          <Text style={{ fontSize: 20, fontFamily: 'BRANDING-MEDIUM', textAlign: 'center', marginTop: 20, }}>{languages.welcomeDes}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

            <Text
              onPress={() => this.storeUserType(2)}
              style={{
                fontSize: 18, textAlign: 'center', color: Colors.black, fontFamily: 'BRANDING-MEDIUM',
                backgroundColor: Colors.green, padding: 10,
                paddingLeft: 50, paddingRight: 50, marginLeft: 40, marginRight: 5
              }}>{languages.yes}
            </Text>
            <Text
              onPress={() => this.storeUserType(3)}
              style={{
                fontSize: 18, textAlign: 'center', color: Colors.white, fontFamily: 'BRANDING-MEDIUM',
                backgroundColor: Colors.darkGrey, padding: 10,
                paddingLeft: 50, paddingRight: 50, marginRight: 40, marginLeft: 5
              }}>{languages.no}
            </Text>
          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
