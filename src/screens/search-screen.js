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
  TextInput,
  ActivityIndicator
} from 'react-native';

import CategoryItem from '../components/category/category-item'
import {truncate} from '../libary'


export default class SearchScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: `Tìm kiếm`,
    header: null,
    headerTitleStyle: {marginRight: 10, color: "white"},
    headerStyle: style.navbar,

  });
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});
  constructor(props){
    super(props);
     
      this.state = {
        dataSource: this.ds.cloneWithRows([
          
        ]),
        categories: [],
        isloadingmore: false,
        isEndItem: false,
        isSearching: false,
        keyword: '',
        currentSearch: -1
    };
    this.onFetchSearch = this.onFetchSearch.bind(this);
    this.onChangeKeyword = this.onChangeKeyword.bind(this); 
  }

  renderFooter(){
      let button = null;
      if (this.state.isSearching == true){
        button = <ActivityIndicator
                style={[Indicatorstyles.centering, {transform: [{scale: 1.4}]}]}
                size="large"
                color="#32c5d2"
            />;
      }
      return button;
    }
  onChangeKeyword(text){
      console.log(text);
      this.setState({keyword: text});
      console.log(text);
        this.onFetchSearch();
      
  }
  onFetchSearch(){
     let currentSearch = this.state.currentSearch + 1;
     this.setState({isSearching: true, currentSearch: currentSearch,  dataSource: this.ds.cloneWithRows([
          
        ]),
        categories: []});
     
     fetch('https://guarded-fjord-95834.herokuapp.com/api/categories/find?order=dateUpdate&orderby=desc&keyword=' + this.state.keyword,  {
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
              let searchIndex = this.state.currentSearch;
              if (searchIndex == currentSearch)
              {
                  this.state.categories = responseJson;
                  this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.categories), isSearching: false});
              }
        })
        .catch((error) => {
          console.error(error);
           this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.categories), isSearching: false});
        });
  }
  render(){
    let {navigate, goBack} = this.props.navigation;
     return ( <View style={{flex: 1}}>
       <View style={{height:50, elevation: 2,  width: '100%', backgroundColor: "#11c1f2", flexDirection: 'row'}}>
        
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableNativeFeedback onPress={() => {
              goBack();
            }}>
            <Icon onTouch={() => {}} name="arrow-back" size={24} color='white'/>
          </TouchableNativeFeedback>
        </View>
        <View style={{flex: 9, justifyContent: 'center'}}>
             <TextInput 
                style={{fontSize: 18, borderRadius: 5, margin: 3, backgroundColor: "white", padding: 5, elevation: 2}}
                autoFocus={true}
                placeholder ={"Tìm kiếm(tên, tác giả, thể loại...)"}
                autoCorrect={true}
                onChangeText={this.onChangeKeyword}
                value={this.state.keyword}
                />
        </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableNativeFeedback onPress={() => {
              this.setState({keyword: ''});
            }}>
            <Icon onTouch={() => {}} name="close" size={24} color='white'/>
          </TouchableNativeFeedback>
        </View>
       
        </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <CategoryItem category={rowData} navigation={this.props.navigation} />}
              renderFooter={this.renderFooter.bind(this)}
            />
          
        </View>
          );
  }
}
const style = StyleSheet.create({
  navbar: {
    backgroundColor: '#32c5d2'
  }
})

const Indicatorstyles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
});