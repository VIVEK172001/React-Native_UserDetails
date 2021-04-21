import React,{useContext,useEffect,useState} from 'react';
import {Text,StyleSheet, View} from "react-native";
import { Container, Header, Content, Tab, Tabs,Left, Body, Right, Title, DefaultTabBar,ScrollableTab,Button,Icon} from 'native-base';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import {AuthContext} from "../navigation/AuthProvider";
import Icon1 from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ViewAllUser from "./ViewAllUser";


const HomeScreen = (props) => {

  const {user,logout} = useContext(AuthContext);
  const [isFirstLaunch, setIsFirstLunch] = useState(false)
    const [load, setLoad] = useState(true)

  useEffect(() => {
    firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .get()
    .then(documentSnapshot =>{
      if(!documentSnapshot.data()){
        props.navigation.navigate('RegisterUser')
      }
      console.log(documentSnapshot.data())
    })
    .catch((error) => {
       console.log(error);   
    });

  }, []);
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    
      }}>
        <Header style={{backgroundColor:"#2e64e5"}}>
            <Left/>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Icon1.Button name="log-out" size={25} backgroundColor="#2e64e5" onPress={() =>logout()}/>
            </Right>
          </Header>

      <Mytext text="" />
      
      <Mybutton
        title="Click Here To View All Users"
        customClick={() => props.navigation.navigate('ViewAllUser')}
        style={{marginHorizontal:20}}
      />
  </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginVertical:10,
    marginHorizontal:100,
    color: '#051d5f',
  },
});
