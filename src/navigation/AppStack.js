import React,{useState,useEffect,useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';

import AsyncStorage from "@react-native-community/async-storage";

import HomeScreen from '../pages/HomeScreen';
import RegisterUser from '../pages/RegisterUser';
import ViewAllUser from '../pages/ViewAllUser';

import {createStackNavigator} from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';

const Stack=createStackNavigator();

const AppStack=()=>{

    return(
        <Stack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2e64e5", 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{header:()=>null}}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{title: 'Register',header:()=>null}}
        />

        <Stack.Screen
          name="ViewAllUser"
          component={ViewAllUser}
          options={{title: 'View All'}}
        />
        
      </Stack.Navigator>
    )
}

export default AppStack;
