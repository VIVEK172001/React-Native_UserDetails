import React,{useState,useContext} from "react";
import {
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import FromInput from "../components/FromInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import {AuthContext} from '../navigation/AuthProvider';


const LoginScreen=({navigation})=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {login,googleLogin} = useContext(AuthContext);
   
    return (
    
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assests/user-male.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>User</Text>
            <FromInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

             <FromInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
             />     
            
            <FormButton
                buttonTitle="Sign In"
                onPress={() =>login(email, password)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}></Text>
            </TouchableOpacity>

            {Platform.OS === 'android' ? (
            <View>
              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => googleLogin()}
              />
            </View>
          ) : null}

            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>
                    Don't have an acount? Create here
                </Text>
            </TouchableOpacity>
                      
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
  });