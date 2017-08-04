import React, {Component} from 'react'
import {View, Text, ScrollView, Image, StyleSheet, FlatList,ListView, ActivityIndicator , WebView, Button} from 'react-native'
import {renderImageTag} from '../libary'
import HtmlText from 'react-native-html-to-text'
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation'
export default class StoryScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
     title: `Chap ${navigation.state.params.story.part} - ${navigation.state.params.category.name}`,
     tabBarIcon: ({ tintColor }) => (
      <Icon onTouch={() => {}} name="content-copy" size={25} color={tintColor}/>
    ),
  });
    constructor(props){
        super(props);
        this.state = {
            story : undefined
        };
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        story: undefined
    };

        this.handleChapterChange = this.handleChapterChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        let params = this.props.navigation.state.params;
        console.log("abc");
        console.log(this.props.navigation.state.key);
        let {story} = params;

        fetch('https://guarded-fjord-95834.herokuapp.com/api/stories/' + story._id,  {
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
        .then((story) => {
           console.log(story);
           this.setState({story: story});
        })
        .catch((error) => {
          console.error(error);
        });
    }
   
    handleChapterChange(story){
         const {navigate} = this.props.navigation;
         let {category, keyback} = this.props.navigation.state.params;
         this.props.navigation.dispatch({
            key: `Story${(new Date()).getMilliseconds()}`,
            type: 'ReplaceCurrentScreen',
            routeName: 'Story',
            params: { story, category },
            index: 1,
            routes: [
                {
                key: "Info",
                params: {story, category},
                routeName: 'Info'
            },
                {
                key: "Story1",
                params: {story, category},
                routeName: 'Story1'
            },
            {
                   key: "Comment",
                params: {story, category},
                routeName: 'Comment'

            }
            ]
        });
    }
    handleBack(){
        const {navigate, goBack} = this.props.navigation;
        goBack();
    }
    render(){

        let {story} = this.state;
        const {navigate, goBack} = this.props.navigation;
        if (!story){
           content = <ActivityIndicator color="#32c5d2" style={{marginTop: 10}}  size="large"/>;
        }
        else
        {
            if (story.cat.type == 1)
                content = <View style={{flex: 1}}><WebView 
                        source={{html: renderImageTag(story.img_main)}}/></View>;
            else content = <ScrollView style={{paddingTop: 5, marginBottom: 5,paddingLeft: 10, paddingRight: 10}}><HTMLView stylesheet={stylesview} value={'<p>' + story.content + '</p>'}></HTMLView></ScrollView>;
        }
        let buttons = null;
        let backButton = <Button color='#36c6d3' title="Quay lại" onPress={goBack}/>;
        if (story && story.cat.stories.length){

            if (story.cat.stories.length == 2){
                buttons = [];
                buttons.push(<Button color='#36c6d3' title="Chap trước" onPress={() => this.handleChapterChange(story.cat.stories[0])}/>);
                buttons.push(<Button color='#36c6d3' title="Về trang truyện" onPress={this.handleBack}/>);
                buttons.push(<Button color='#36c6d3' title="Chap kế" onPress={() => this.handleChapterChange(story.cat.stories[1])}/>)
            }
            else
            {
                let _story = story.cat.stories[0];
                if (_story.part == story.part + 1)
                {
                     buttons = [];
                     buttons.push(<Button color='#36c6d3' title="Về trang truyện" onPress={this.handleBack}/>);
                     buttons.push(<Button color='#36c6d3' title="Chap kế" onPress={() => this.handleChapterChange(_story)}/>)
                }
                else
                {
                     buttons = [];
                     buttons.push(<Button color='#36c6d3' title="Chap trước" onPress={() => this.handleChapterChange(_story)}/>);
                     buttons.push(<Button color='#36c6d3' title="Về trang truyện" onPress={this.handleBack}/>);
                }
            }
        }

        return (

                <View style={[styles.view, styles.base, story && story.cat.type == 1]}>
                    
                    {content}
                    {
                        story != undefined && <View  style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                           {buttons}
                        </View>
                     }
                </View>

        );
    }
    
}
const stylesview = StyleSheet.create({

 
  p: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black', // make links coloured pink

  },
});
const styles = StyleSheet.create({
  view:{
      backgroundColor: 'white'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 10
    
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  base:{
      flex: 1
  }

});
