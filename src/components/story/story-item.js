import FadeInView from '../shared/fade-in-view'
import React, { Component } from 'react';
import {TouchableNativeFeedback, View, Image, Text} from 'react-native'
import {truncate} from '../../libary'

export default class StoryItem extends Component{
  constructor(props){
    super(props);
    
  }
  _onPressButton(){
    const {navigate} = this.props.navigation;
      navigate('Story', {story: this.props.story, category: this.props.category});
  }
  render(){
   let {story} = this.props;
    return (
         <FadeInView 
                style={{marginLeft: 3, marginRight: 3, marginBottom: 5, borderRadius: 1, elevation: 2, backgroundColor: 'white', height: 130, width: 150}}>
                  <TouchableNativeFeedback 
                    onPress={this._onPressButton.bind(this)}>
                <View style={{flex: 1}}>
                    <View style={{flex: 5, backgroundColor: 'skyblue'}}>
                         <Image source={{
                              uri: story.img_pre
                            }}
                            style={{ flex: 1}}/>
                    </View>

                    <View style={{flex: 2}}>
                         <View style={{flex: 1, justifyContent: 'space-around'}}>
                          <Text  style={{textAlign: 'center', fontSize: 17, color: '#32c5d2'}}>{truncate(true, story.name, 15)}</Text>
                          <Text style={{textAlign: 'center'}}>Phần: {story.part}</Text>
                        </View>
                    </View>
                </View>
                </TouchableNativeFeedback>
          </FadeInView>
     
    );
  }  
}
