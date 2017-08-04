import FadeInView from '../shared/fade-in-view'
import React, { Component } from 'react';
import {TouchableNativeFeedback, View, Image, Text} from 'react-native'
import {truncate} from '../../libary'
import ElevatedView from 'react-native-elevated-view'
export default class CategoryItem extends Component{
  constructor(props){
    super(props);
    
  }
  _onPressButton(){
    const {navigate} = this.props.navigation;
      navigate('Category', {category: this.props.category});
  }
  render(){
    
    return (
    
      <FadeInView style={{height: 100, marginLeft: 3, marginTop: 3, marginRight: 3, borderRadius: 1, marginBottom: 3, elevation: 2, backgroundColor:'white'}}>
         <TouchableNativeFeedback 
                    onPress={this._onPressButton.bind(this)}
                  >
        <View  style = {{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 4}}>
                <Image source={{
      uri: this.props.category.img
    }} style={{flex: 1}}/>
            </View>
             <View style={{flex: 7}}>
                
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                      <Text  style={{textAlign: 'center', fontSize:18, color: '#32c5d2'}}>{truncate(true, this.props.category.name, 20)}</Text>
                      <Text style={{textAlign: 'center'}}>Số chap: {this.props.category.stories.length == 0 ? 0 : this.props.category.stories[0].part}</Text>
                      <Text style={{textAlign: 'center'}}>Tác giả: <Text style={{fontWeight: 'bold'}}>{this.props.category.author}</Text></Text>
                    </View>
                
            </View>
        </View>
         </TouchableNativeFeedback>
      </FadeInView>
     
    );
  }  
}
