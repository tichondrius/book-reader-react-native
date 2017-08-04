import Drawer from 'react-native-drawer'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoryItem from '../components/story/story-item'
import CategoryItem from '../components/category/category-item'
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
  ActivityIndicator,
  Picker,
  RefreshControl,
  ViewPagerAndroid,
} from 'react-native';

import {StackNavigator, DrawerNavigator} from 'react-navigation'
import {truncate} from '../libary'


export default class CategoryTypeScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: `Thể loại ${navigation.state.params.type.name}`,
  });
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});


  constructor(props){
    super(props);
    let params = this.props.navigation.state.params;
    let {category} = params;
    this.state = {
      stories: undefined,
      storiesSource: this.ds.cloneWithRows([
        
      ],
      ),
      isloadingmore: false,
      isEndItem: false
    };
    
  }
 
  componentDidMount(){
    let params = this.props.navigation.state.params;
    let {type} = params;

     //fetch fewer list story detail
      fetch('https://guarded-fjord-95834.herokuapp.com/api/categories?order=dateUpdate&orderby=desc&types=' + type._id,{
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
            this.setState({stories: responseJson, storiesSource: this.state.storiesSource.cloneWithRows(responseJson)});
        })
        .catch((error) => {
          console.error(error);
        });
  }
  handlerEndReached(){
    let params = this.props.navigation.state.params;
    let {type} = params;

    if (this.state.isloadingmore == true || this.state.isEndItem == true) return;
     this.setState({isloadingmore: true});
     let curQty = this.state.storiesSource.getRowCount();
     
     
     fetch('https://guarded-fjord-95834.herokuapp.com/api/categories?order=dateUpdate&orderby=desc&types=' + type._id + '&skip=' + curQty,  {
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
            this.setState({isEndItem: true,  isloadingmore: false});
          }
          else
          {
              this.state.stories = this.state.stories.concat(responseJson);
             this.setState({storiesSource: this.state.storiesSource.cloneWithRows(this.state.stories), isloadingmore: false});
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  renderHeader(){
    let params = this.props.navigation.state.params;
    let {type} = params;
      return <TouchableNativeFeedback>
                <View style={{flex: 1, backgroundColor: "#32c5d2", padding: 10, marginLeft: 2, marginRight: 2}}>
                    <Text style={{color: "white", fontSize: 17, textAlign: 'center'}}>Danh sách truyện thuộc thể loại ({type.categories.length})</Text>
                </View>
          </TouchableNativeFeedback>
  }
  renderFooter(){
    let button = null;
    if (this.state.stories == undefined || (this.state.isEndItem == false && this.state.isloadingmore == true))
    {
      button = <ActivityIndicator
              style={[Indicatorstyles.centering, {transform: [{scale: 1.4}]}]}
              size="large"
              color="#32c5d2"
          />;
    }
    return button;
  }
  render(){
    let params = this.props.navigation.state.params;
    let {type} = params;

    return (
      <ScrollView  style={{margin: 5, marginTop: 10, elevation: 2}}>
          <ListView
            refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={()=> {this.setState({isRefreshing: false})}}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />}
            dataSource={this.state.storiesSource}
            renderRow={(rowData) => <CategoryItem category={rowData} navigation={this.props.navigation} />}
            renderFooter={this.renderFooter.bind(this)}
            renderHeader={this.renderHeader.bind(this)}
            onEndReached={this.handlerEndReached.bind(this)}
            onEndReachedThreshold={10}
          />
         
        
     
      </ScrollView>
    );
  }
}
 const styles = StyleSheet.create({
    picker: {
      width: 100,
    },
  });

  const Indicatorstyles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
});