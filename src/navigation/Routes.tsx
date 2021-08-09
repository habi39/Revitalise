
import React, {useContext, useState, useEffect, FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';


import AuthStack from './AuthStack';
import AppStack from './AppStack';


import  firebase from '/Users/lkm/reactNativeProject/src/firebase/firebase';




const Routes: FC = () => {
  const [user, setUser] = useState<any>(null);
  
    const bootstrap = () => {
        firebase.auth().onAuthStateChanged(_user => {
            if (_user) {
              setUser(_user)
              
              
            } else {
                setUser(null)
            }
        })
    }
    

    useEffect(() => {
      bootstrap();
      return () => {
        setUser(null); // This worked for me
      };
    },[])


  return (
    <NavigationContainer>
      {user !==null ? <AppStack userId={user.uid}/> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;



