import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation'
import {truncate} from './libary'
import HomeScreen from './screens/home-screen'
import CategoryScreen from './screens/category-screen'
import ComicScreen from './screens/comic-story-screen'
import ReadStoryScreen from './screens/read-story-screen'
import StoryScreen from './screens/story-screen'
import SearchScreen from './screens/search-screen'
import CategoryTypeScreen from './screens/category-type-screen'
import CommentScreen from './screens/comment-screen'
import {Text, View} from 'react-native';
import React, {Component} from 'react'
import {Drawler} from './components/shared/drawler'
import StoryInfoScreen from './screens/story-info-screen'
const TabTruyen = TabNavigator({
   HomeTab: { screen: HomeScreen },
   ComicTab: { screen: ComicScreen },
   ReadStoryTab: { screen: ReadStoryScreen },
}, 
   {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
     tabStyle: {margin: 0, padding: 0, height: 40},
    style: {
     backgroundColor: '#32c5d2'
    },
  },
  tabBarPosition: 'bottom',

});


const StoryTab = TabNavigator({
  Info: {screen: StoryInfoScreen},
  Story1: {screen: StoryScreen},
  Comment: {screen: CommentScreen},
}, {
  initialRouteName: 'Story1',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    tabStyle: {margin: 0, padding: 0, height: 40},
     style: {
     backgroundColor: '#32c5d2'
    },
  },
  tabBarPosition: 'top',

});

const StackTruyen = StackNavigator({
  Home: {screen: TabTruyen },
  Category: { screen: CategoryScreen },
  Story: {screen: StoryTab},
  Search: {screen: SearchScreen},
  CategoryType: {screen: CategoryTypeScreen}
},{
  navigationOptions: {
    headerTitleStyle: { color: 'white' },
    headerStyle: {backgroundColor: '#11c1f2'},
    headerTintColor: 'white'
  }
});

const prevGetStateForActionHomeStack = StackTruyen.router.getStateForAction;
StackTruyen.router = {
  ...StackTruyen.router,
  getStateForAction(action, state) {
    if (state && action.type === 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      console.log(routes);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
    return prevGetStateForActionHomeStack(action, state);
  },
};

const TruyenKhin = DrawerNavigator({
  HomePage: {screen: StackTruyen}
}, {drawerWidth: 280, contentComponent: props => <Drawler {...props}/>});

export default TruyenKhin;


