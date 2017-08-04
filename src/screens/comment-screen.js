import Drawer from 'react-native-drawer'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ListView,
  TouchableHighlight,
  TouchableNativeFeedback,
  Alert,
  alertMessage,
  Animated,
  ToolbarAndroid,
  Button,
  ProgressBarAndroid,
  Picker,
  RefreshControl,
  ViewPagerAndroid,
  TextInput
} from 'react-native';


import {truncate} from '../libary'


export default class CommentScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: `Chap ${navigation.state.params.story.part} - ${navigation.state.params.category.name}`,
    tabBarIcon: ({ tintColor }) => (
      <Icon onTouch={() => {}} name="comment" size={25} color={tintColor}/>
    ),
    showIcon: true,
    showLabel: false


  });
  constructor(props){
    super(props);
  }
 
  render(){
      return <View></View>;
  }
}
const style = StyleSheet.create({
  navbar: {
    backgroundColor: '#32c5d2'
  }
})