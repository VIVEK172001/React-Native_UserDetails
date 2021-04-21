import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {createStackNavigator} from "@react-navigation/stack";

import LoginScreen from "../pages/LoginScreen";
import SignupScreen from "../pages/SignupScreen";
//import AsyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GoogleSignin } from '@react-native-community/google-signin';

const Stack=createStackNavigator();


const AuthStack=()=>{
    useEffect(() => {
    GoogleSignin.configure({
      webClientId: "373254018191-kjpijca1dqt94eii750l8398d4o2ub7d.apps.googleusercontent.com",
    });

    }, []);


    return(
         <Stack.Navigator initialRouteName={"Login"}>

            <Stack.Screen name="Login" component={LoginScreen} options={{header:()=>null}}  />
            <Stack.Screen name="Signup"
                            component={SignupScreen}
                            options={({navigation}) => ({
                            title: '',
                            headerStyle: {
                            backgroundColor: '#f9fafd',
                            shadowColor: '#f9fafd',
                            elevation: 0,
                        },
                        headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                            <FontAwesome.Button 
                                name="long-arrow-left"
                                size={25}
                                backgroundColor="#f9fafd"
                                color="#333"
                                onPress={() => navigation.navigate('Login')}/>
                        </View>
                        ),
                        })}
            />
        
         </Stack.Navigator>
    );
};

export default AuthStack;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
    },
});