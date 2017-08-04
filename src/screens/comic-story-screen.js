import Drawer from 'react-native-drawer'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  View,
  ScrollView,
  ListView,
  ProgressBarAndroid,
  RefreshControl,
  Button,
  StyleSheet
 
} from 'react-native';

import {truncate} from '../libary'
import CategoryItem from '../components/category/category-item'



export default class ComicScreen extends Component {
 static navigationOptions = ({ navigation }) => ({
    title: `  Truyện tranh`,
     tabBarIcon: ({ tintColor }) => (
      <Icon onTouch={() => {}} name="image" size={25} color={tintColor}/>
    ),
    headerTitleStyle: {marginRight: 10, color: "white"},
    headerStyle: style.navbar,
    headerLeft : <Icon.Button
    color="white"
    style={{paddingRight: 0}}
    name="menu"
    backgroundColor="#11c1f2"
    size={35}
    onPress={()=>{navigation.navigate('DrawerOpen')}}>

                </Icon.Button>,
    headerRight : <Icon.Button
    color="white"
    style={{paddingRight: 0}}
    name="search"
    backgroundColor="#11c1f2"
    size={35}
    onPress={()=>{navigation.navigate('Search')}}>

                </Icon.Button>
    
  });
  // Initialize the hardcoded data
  constructor(props) {
    
    
    super(props);
    
    this.setInitState();
  }
  setInitState(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        
      ]),
      categories: [],
      firstLoad: false,
      isloadingmore: false,
      isRefreshing: false,
      isEndItem: false
    };
  }
  
  
  componentDidMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch('https://guarded-fjord-95834.herokuapp.com/api/categories?order=dateUpdate&orderby=desc&type=1',  {
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
        .then((responseJson) => {
          this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson), firstLoad: true, categories: responseJson});
         
        })
        .catch((error) => {
          console.error(error);
        });
    }
  _onRefresh = () => {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({isRefreshing: true});
    this.setState({
      dataSource: ds.cloneWithRows([
        
      ]),
      categories: [],
      isloadingmore: false,
      isEndItem: false
    });
    fetch('https://guarded-fjord-95834.herokuapp.com/api/categories?order=dateUpdate&orderby=desc&type=1',  {
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
        .then((responseJson) => {
          this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson), firstLoad: true, categories: responseJson, isRefreshing: false});
         
        })
        .catch((error) => {
          console.error(error);
        });
  };

  renderFooter(){
    let button = null;
    if (this.state.isEndItem == false && this.state.isRefreshing == false && (this.state.isloadingmore == true || this.state.firstLoad && this.state.firstLoad == true)){
      button = <ProgressBarAndroid styleAttr="Inverse"/>;
    }
    return button;
  }
  handlerEndReached(){
     if (this.state.isloadingmore == true) return;
     this.setState({isloadingmore: true});
     let curQty = this.state.dataSource.getRowCount();
     
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     fetch('https://guarded-fjord-95834.herokuapp.com/api/categories?order=dateUpdate&orderby=desc&type=1&skip=' + curQty,  {
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
        .then((responseJson) => {
          if (responseJson.length <= 0)
          {
            this.setState({isEndItem: true});
          }
          else
          {
              this.state.categories = this.state.categories.concat(responseJson);
          this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.categories), isloadingmore: false});
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  render() {
  
   let processBar = <View/>;
   if (this.state.firstLoad == false){
     processBar =  <ProgressBarAndroid styleAttr="Inverse"/>;
   }
    return (
        <View style={{flex: 1, padding: 5}}>
          {processBar}
          <ListView
            refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#11c1f2','#00ff00', '#32c5d2']}
              progressBackgroundColor="white"
            />}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <CategoryItem category={rowData} navigation={this.props.navigation} />}
            renderFooter={this.renderFooter.bind(this)}
            onEndReached={this.handlerEndReached.bind(this)}
            onEndReachedThreshold={10}
          />
        </View>
    );
  }
}
const style = StyleSheet.create({
  navbar: {
    backgroundColor: '#11c1f2'
  }
})