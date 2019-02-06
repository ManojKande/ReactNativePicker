/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';
import Picker from './src/picker'

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 5}} />
        <Picker items={["1123121123121", "1", "5", "^","112312", " 2", "1", "112312112312112312112312112312112312112312112312112312112312","1123121123121", "1", "5", "^","112312", " 2", "1", "112312112312112312112312112312112312112312112312112312112312","1123121123121", "1", "5", "^","112312", " 2", "1", "112312112312112312112312112312112312112312112312112312112312","1123121123121", "1", "5", "^","112312", " 2", "1", "112312112312112312112312112312112312112312112312112312112312","1123121123121", "1", "5", "^","112312", " 2", "1", "112312112312112312112312112312112312112312112312112312112312","1123121123121", "1", "5", "^","112312", " 2", "1", "112312112312112312112312112312112312112312112312112312112312","1123121123121", "1", "5", "^","112312", " 2", "1", "112312112312112312112312112312112312112312112312112312112312",]} />
        <View style={{ flex: 3 }} />
      </SafeAreaView>
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
