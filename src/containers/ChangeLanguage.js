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

export default class ChangeLanguage extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  storeLang = async (lang) => {

    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      await AsyncStorage.setItem('LANGUAGE', lang);

      languages.setLanguage(lang)

      console.log("STOREDDD")
    } catch (error) {
      console.log(error.message);
    }

    this.props.navigation.navigate('HomeScreen')
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }} >

        <ImageBackground
          style={{
            flex: 1

          }}
          source={require('../assets/BackgroundImages/default_backdrop.png')}
          resizeMode='stretch'>


          <AppHeader navigation={this.props.navigation} hideMenu={true}></AppHeader>

          <Text style={{ fontSize: 30,color:Colors.textColor,
             fontFamily: 'BRANDING-MEDIUM', textAlign: 'center', marginTop: 150 }}>Select Language</Text>
          {/* <Text style={{fontSize:16, fontFamily: 'BRANDING-THIN', textAlign: 'center', marginTop: 20 }}>{languages.welcomeDes}</Text> */}

          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            marginTop: 40
          }}>

            <Text
              onPress={() => this.storeLang('en')}
              style={{
                flex: 1,
                fontSize: 18, textAlign: 'center', color: Colors.textColor, fontFamily: 'BRANDING-MEDIUM',
                backgroundColor: Colors.green, padding: 10,
                paddingLeft: 20, paddingRight: 20, marginLeft: 40, marginRight: 5
              }}>{'ENGLISH'}
            </Text>
            <Text
              onPress={() => this.storeLang('ar')}
              style={{
                flex: 1,
                fontSize: 18, textAlign: 'center', color: Colors.white, fontFamily: 'BRANDING-MEDIUM',
                backgroundColor: Colors.darkGrey, padding: 10,
                paddingLeft: 20, paddingRight: 20, marginRight: 40, marginLeft: 5
              }}>{'عربى'}
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
