import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children,navigation}) => {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        
        googleLogin: async () => {
          try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential)
          } catch(error) {
            console.log({error});
          }
        },


        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },


        logout: async () => {
          try {
            auth()
            .signOut()
            .then(() => console.log('sign out'));
          } catch (e) {
            console.log(e);
          }
        },
      }}>

      {children}
      
    </AuthContext.Provider>
  );
};