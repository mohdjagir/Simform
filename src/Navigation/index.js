import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Dashboard from '../Layouts/Dashboard';
import Strips from '../Layouts/Strips';
import Login from '../Layouts/Login';

const HomeTabNavigation=createBottomTabNavigator({
     Dashboard:{
        screen:Dashboard,
        navigationOptions:{  
            tabBarLabel:'Feeds',  
            tabBarIcon:({tintColor})=>(  
                <Icon name="fa-rss" type="font-awesome" color={tintColor} size={25}/>  
            )
          } 
     }
    ,
     Strips:{
        screen:Strips,
        navigationOptions:{  
            tabBarLabel:'Strips',  
            tabBarIcon:({tintColor})=>(  
                <Icon name="calendar-plus-o" type="font-awesome" color={tintColor} size={25}/>  
            )
         }
     },
   
})

const SwitchNavigation=createSwitchNavigator({
    Login:Login,
    Dashboard:HomeTabNavigation
})
const appContainer= createAppContainer(SwitchNavigation);
export default appContainer;