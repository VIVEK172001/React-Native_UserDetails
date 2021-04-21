import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import { Container, Header, Content, Tab, Tabs,Left, Body, Right, Title, DefaultTabBar,ScrollableTab,Button,Icon} from 'native-base';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { set } from 'lodash';

const RegisterUser = (props) => {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userCount, setUserCount] = useState(null);

  handleRegistration = () => {
    if (userName!='' && userContact!='' && userAge!='') {
     firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .set({
          name: userName,
          contact: userContact,
          age: userAge,
        })
        .then(() => {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress: () => props.navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        })
        .catch((error) => {
          Alert.alert(
            'Exception',
            error,
            [
              {
                text: 'Ok',
                onPress: () => props.navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        });

    } else {
      alert('Please fill all the details');
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
       <Header style={{backgroundColor:"#2e64e5"}}>
            <Left/>
            <Body>
              <Title>Register User</Title>
            </Body>
            <Right/>
          </Header>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 35}}>
          <Mytextinput
            placeholder="Enter Name"
            onChangeText={(userName) => setUserName(userName)}
            style={{padding: 10,color:'#0D0D0D'}}
          />
          <Mytextinput
            placeholder="Enter Contact No"
            onChangeText={(userContact) => setUserContact(userContact)}
            maxLength={10}
            keyboardType="numeric"
            style={{padding: 10,color:'#0D0D0D'}}
          />
          <Mytextinput
            placeholder="Enter Age"
            onChangeText={(userAge) => setUserAge(userAge)}
            maxLength={5}
            keyboardType="numeric"
            style={{textAlignVertical: 'top', padding: 10,color:'#0D0D0D'}}
          />
          <Mybutton title="Submit" customClick={handleRegistration} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default RegisterUser;
