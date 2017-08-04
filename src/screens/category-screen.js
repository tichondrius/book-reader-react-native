import Drawer from 'react-native-drawer'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoryItem from '../components/story/story-item'
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


export default class CategoryScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: `Chi tiết truyện ${navigation.state.params.category.name}`,
  });
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});


  constructor(props){
    super(props);
    let params = this.props.navigation.state.params;
    let {category} = params;
    this.state = {
      introduce_short: true,
      need_short: category.introduce.length > 200 ? true : false,
      collapse_chap: true,
      category: undefined,
      picker: "-1",
      stories: undefined,
      storiesSource: this.ds.cloneWithRows([
        
      ],
      ),
      isloadingmore: false,
      isEndItem: false
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    
  }
  onPressHideIntroduce(value){
     this.setState({introduce_short: true});
  }
  onPressShowIntroduce(value){
      this.setState({introduce_short: false});
  }

  _renderHeader(){
    return (
      <View><Text>Header132132131</Text></View>
    );
  }
  _renderContent(){
    return (
      <View><Text>Content</Text></View>
    );
  }
  componentDidMount(){
    let params = this.props.navigation.state.params;
    let {category} = params;
    //fetch list story
    fetch('https://guarded-fjord-95834.herokuapp.com/api/categories/' + category._id,  {
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
          this.setState({category: responseJson});
        })
        .catch((error) => {
          console.error(error);
        });
     //fetch fewer list story detail
      fetch('https://guarded-fjord-95834.herokuapp.com/api/stories?order=part&orderby=asc&category=' + category._id,{
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
    let {category} = params;

    if (this.state.isloadingmore == true || this.state.isEndItem == true) return;
     this.setState({isloadingmore: true});
     let curQty = this.state.storiesSource.getRowCount();
     
     console.log('https://guarded-fjord-95834.herokuapp.com/api/stories?order=part&orderby=asc&category=' + category._id + '&skip=' + curQty);
     fetch('https://guarded-fjord-95834.herokuapp.com/api/stories?order=part&orderby=asc&category=' + category._id + '&skip=' + curQty,  {
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
  handleValueChange(value){
    console.log(value);
    if (value == '-1'){
      return;
    }
    else
    {
      const {navigate, goBack} = this.props.navigation;
      let key = this.props.navigation.state.key;
      this.setState({picker: value});
      goBack("Story"); 
      navigate('Story', {story: value, category: this.props.navigation.state.params.category});
    }
  }
  render(){
    let params = this.props.navigation.state.params;
    let {category} = params;
    let showHideIntroduce = <View/>;
    let state = this.state;
    if (state.need_short == true)
    {
        if (state.introduce_short == true)
        {
          showHideIntroduce = <Button onPress={this.onPressShowIntroduce.bind(this)} title='Xem thêm giới thiệu'></Button>
        }
        else showHideIntroduce = <Button onPress={this.onPressHideIntroduce.bind(this)} title='Bớt giới thiệu'></Button>
    }
    let readButtons = [];
    if (state.category && state.category.stories.length)
    {
        if (state.category.stories.length >= 2)
        {
          
           readButtons = [
              <Button onPress={() => this.handleValueChange(state.category.stories[state.category.stories.length - 1])} color='#36c6d3' title='Đọc chap đầu'/>,
              <Button onPress={() => this.handleValueChange(state.category.stories[0])} color='#36c6d3' title='Đọc chap cuối'/>
           ];
           
        }
        else
        {
           readButtons = [<Button onPress={() => this.handleValueChange(state.category.stories[0])} color='#36c6d3' title='Đọc chap đầu'/>];
        }
    }
    else readButtons = null;

    return (
      <ScrollView  style={{margin: 5, elevation: 2}}>
        <View style={{minHeight: 200}}>
          <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                    <Image source={{
                uri: category.img
              }}
              style={{ flex: 1}} resizeMode='contain' />
            </View>
          </View>
        </View>
        <View style={{backgroundColor: '#c0edf1', padding: 5, borderColor:'#58d0da', borderLeftWidth: 4, borderRightWidth: 4}}>
          <View style={{margin: 8}}>
            <Text><Text style={{color: 'black', fontWeight: 'bold'}}>Tên truyện: </Text><Text>{category.name}</Text></Text>
            <Text><Text style={{color: 'black', fontWeight: 'bold'}}>Tác giả: </Text><Text>{category.author}</Text></Text>
             <Text><Text style={{color: 'black', fontWeight: 'bold'}}>Giới thiệu truyện: </Text>
                <Text>{truncate(this.state.introduce_short, category.introduce, 200)}</Text>
                
             </Text>
             <View style={{flex: 1, flexDirection: 'row'}}>
               <View style={{flex: 3}}></View>
               <View style={{flex: 7}}>{showHideIntroduce}</View>
               <View style={{flex: 3}}></View>
             </View>
          </View>
        </View>
        {  this.state.category != undefined &&
           (<View><Picker style={{backgroundColor: '#58d0da'}}
              itemStyle={styles.items}
              selectedValue={this.state.picker}
              onValueChange={this.handleValueChange.bind(this)}>
                  <Picker.Item value={'-1'}  label={`Chọn chap truyện để xem (${this.state.category.stories.length})`} key={-1}  />
                  {this.state.category.stories.map((l, i) => {return <Picker.Item value={l} label={`Chap ${l.part}: ${l.name}`} key={i}  /> })}
           </Picker>
            <View style={{marginTop: 10, flex: 1, flexDirection: 'row',justifyContent: 'space-between'}}>
                {readButtons}
            </View>
            </View>)
        }
        {
            (this.state.category == undefined || this.state.stories == undefined) && <ActivityIndicator
              style={[Indicatorstyles.centering, {transform: [{scale: 1.4}]}]}
              size="large"
              color="#32c5d2"
          />
        }
         <ListView
            renderFooter={() => this.state.isloadingmore == true && <ActivityIndicator
              style={[Indicatorstyles.centering, {transform: [{scale: 1.4}]}]}
              size="large"
              color="#32c5d2"
          />}
            onEndReached={this.handlerEndReached.bind(this)}
            style={{marginTop: 10}}
            horizontal={true}
            dataSource={this.state.storiesSource}
            renderRow={(rowData) => <StoryItem story={rowData} category={this.state.category} navigation = {this.props.navigation}/>
             }
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