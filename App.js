/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Root } from 'native-base'

import Erbitux from './src/components/AppNavigator'

import languages from './src/languages'


export default class App extends Component {

  constructor() {
    super()

  }

  componentWillMount() {
    //languages.setLanguage('en')
  }

  render() {
    return (
      <Root>
        <Erbitux />
      </Root>

    );
  }
}
