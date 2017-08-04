import {
  AppRegistry
} from 'react-native';
import React, { Component } from 'react';
import Root from './src/index'




console.error = (error) => error.apply;
console.disableYellowBox = true;

const App = () => (
  <Root/>
)

AppRegistry.registerComponent('TruyenKhin', () => App);
