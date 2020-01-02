/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import languages from './src/languages'

export default class Try extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Daniel'
    };

  }

  componentDidMount(){
    console.log("DIIDDDD=========")
    languages.getLanguage()
  }


  render() {

    return (
      <View style={styles.container}>
        <Text>Welcome { languages.first } to our localized app!</Text>       
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
