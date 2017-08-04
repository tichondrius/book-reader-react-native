import React, {Component} from 'react'
import {View, Text, ScrollView, Image, StyleSheet, TouchableNativeFeedback, ActivityIndicator, Linking, BackHandler} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Group, Item} from './group-item-menu'


export class Drawler extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenTypeStory: true,
            isCategoryGroupOpen: false,
            storyTypes: undefined
        };
    }
    componentDidMount(){
        fetch('https://guarded-fjord-95834.herokuapp.com/api/types',{
        method: 'get',
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((types) => {
          this.setState({storyTypes: types});
        })
        .catch((error) => {
          console.error(error);
        });
    }
    handleTypeStoryChange(){
        this.setState({isOpenTypeStory: !this.state.isOpenTypeStory});
    }
    render(){
        return (
            <View>
             <ScrollView>
                <View style={{width: '100%', height: 170, backgroundColor: 'skyblue'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                        resizeMode='contain'
                        style={s.backgroundImage}
                        source={require('../../images/background-navbar.jpg')}
                        />
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Group 
                        label="Loại truyện"
                        onTouch={() => this.setState({isOpenTypeStory: !this.state.isOpenTypeStory})}
                        icon={<Icon onTouch={() => {}} name="clear-all" size={25} color='#11c1f2'/>}
                        isOpen={this.state.isOpenTypeStory}
                    >
                         <Item 
                            icon={<Icon name="apps" size={25} />}
                            onTouch={() => 
                            {
                                let {navigate} = this.props.navigation;
                                navigate('DrawerClose');
                                navigate("HomeTab");
                            }}
                            label="Tất cả"/>
                        <Item 
                            icon={<Icon name="image" size={25} />}
                            onTouch={() => 
                            {
                                 let {navigate} = this.props.navigation;
                                 navigate('DrawerClose');
                                 navigate("ComicTab");
                             }}
                            label="Truyện tranh"/>
                         <Item 
                            icon={<Icon name="library-books" size={25} />}
                            onTouch={() => 
                            {
                                let {navigate} = this.props.navigation;
                                navigate('DrawerClose');
                                navigate("ReadStoryTab");
                            }}
                            label="Truyện chữ"/>
                        
                    </Group>
                    <Group 
                        onTouch={() => this.setState({isCategoryGroupOpen: !this.state.isCategoryGroupOpen})} 
                        label="Thể loại" 
                        isOpen={this.state.isCategoryGroupOpen} 
                        icon={<Icon onTouch={() => {}} name="clear-all" size={25} color='#11c1f2'/>}>
                        <View>
                                {this.state.storyTypes == undefined && <ActivityIndicator color="#0000ff" />}
                                {this.state.storyTypes != undefined && <View>
                                     {this.state.storyTypes.map((type) => <Item icon={<Icon name="layers" size={25} />} onTouch={() => {
                                         let {navigate} = this.props.navigation;
                                         navigate('CategoryType', {type: type});
                                        }} key={type._id} label={`${type.name} (${type.categories.length})`}/>)} 
                                </View>}
                               
                         </View>
                    </Group>
                     <Group 
                        canDropDown={false}
                        onTouch={() => {
                            let {navigate} = this.props.navigation;
                                         navigate('Search');
                        }} 
                        label="Tìm kiếm" 
                        isOpen={this.state.isCategoryGroupOpen} 
                        icon={<Icon name="search" size={25} color='#11c1f2'/>}>
                    </Group>
                     <Group 
                        canDropDown={false}
                        onTouch={() => Linking.openURL("http://truyenkhin.top/#/home")} 
                        label="truyenkhin.top" 
                        isOpen={this.state.isCategoryGroupOpen} 
                        icon={<Icon name="language" size={25} color='#11c1f2'/>}>
                    </Group>
                    <Group 
                        canDropDown={false}
                        onTouch={() => {}} 
                        label="Cài đặt" 
                        isOpen={this.state.isCategoryGroupOpen} 
                        icon={<Icon name="settings" size={25} color='#11c1f2'/>}>
                    </Group>
                     <Group 
                        canDropDown={false}
                        onTouch={() => BackHandler.exitApp()} 
                        label="Thoát" 
                        isOpen={this.state.isCategoryGroupOpen} 
                        icon={<Icon name="reply-all" size={25} color='#11c1f2'/>}>
                    </Group>
                    
                </View>
            </ScrollView>
            </View>
        );
       
    }
}

const s = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      
  }
});