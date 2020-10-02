import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Dashboard from '../Layouts/Dashboard';
import Strip from '../Layouts/Strips';
import Login from '../Layouts/Login';
import { Icon } from 'react-native-elements';

const StripMenu=createStackNavigator({
    Strip:{
        screen:Strip,
        navigationOptions:{
            header: null
        }
    },
})
const DashboardMenu=createStackNavigator({
    Dashboard:{
        screen:Dashboard,
        navigationOptions:{
            header: null
        }
    },
})
const HomeTabNavigation=createBottomTabNavigator({
     Dashboard:{
        screen:DashboardMenu,
        navigationOptions:{  
            tabBarLabel:'Feeds',  
            tabBarIcon:({tintColor})=>(  
                <Icon name="wpexplorer" type="font-awesome" color={tintColor} size={25}/>  
            )
          } 
     }
    ,
     Chemical:{
        screen:StripMenu,
        navigationOptions:{  
            tabBarLabel:'Strips',  
            tabBarIcon:({tintColor})=>(  
                <Icon name="paper-plane" type="font-awesome" color={tintColor} size={25}/>  
            )
         }
     },
   
})

const SwitchNavigation=createSwitchNavigator({
    Login:Login,
    Dashboard:HomeTabNavigation,
    
},{
    initialRouteName:'Login'
})
const appContainer= createAppContainer(SwitchNavigation);
export default appContainer;