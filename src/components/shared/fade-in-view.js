import {Animated} from 'react-native'
import React, { Component } from 'react';


export default class FadeInView extends Component{
  constructor(props){
    super(props);
    this.state = {
        fadeAnim: new Animated.Value(0),
    }
  }
  componentDidMount(){
      Animated.timing(this.state.fadeAnim, {toValue: 1})
        .start();
  }
  render(){
    return (
      <Animated.View 
      style={{
        ...this.props.style,
        opacity: this.state.fadeAnim
      }}
      >
      {this.props.children}
    </Animated.View>
    )
    
  }
}