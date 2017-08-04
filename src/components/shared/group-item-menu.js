import React, {Component} from 'react'
import {View, Text, ScrollView, Image, StyleSheet, TouchableNativeFeedback, ActivityIndicator, Linking, BackHandler} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


export class Group extends Component{
    constructor(props){
        super(props);

    }
    render(){
        let canDropDown = this.props.canDropDown;
        if (canDropDown == undefined){
            canDropDown = true;
        }
        return (


                    <View >
                        <TouchableNativeFeedback onPress={() => {this.props.onTouch()}}>
                        <View  style={{flex: 1, flexDirection: 'row', padding: 18}}>
                            
                                <View style={{flex: 2}}>
                                    {this.props.icon}
                                </View>
                                <View style={{flex: 7}}>
                                    <Text style={{fontSize: 16, color: "#111111"}}>{this.props.label}</Text>
                                </View>
                                <View style={{flex: 2}}>
                                    {canDropDown == true && this.props.isOpen == true && <Icon name="keyboard-arrow-up" size={25} color='black'/>}
                                    {canDropDown == true && this.props.isOpen == false && <Icon name="keyboard-arrow-down" size={25} color='black'/>}
                                </View>
                        </View>
                            </TouchableNativeFeedback>
                            {this.props.isOpen==true && this.props.children}
                    </View>
            
        );
    }

}

export class Item extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <View style={{}}>
            <TouchableNativeFeedback onPress={() => this.props.onTouch()}>
                <View style={{flex: 1, flexDirection: 'row', padding: 15, paddingLeft: 30}}>
                    <View style={{flex: 2}}>
                    {this.props.icon}
                    </View>
                    <View style={{flex: 7}}>
                        <Text style={{fontSize: 15}}>{this.props.label}</Text>
                    </View>
                        
                </View> 
             </TouchableNativeFeedback>
        </View>
        );

    }
}
