import React, { createContext, FC, useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator , StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen'

import ProfileScreen from '../screens/ProfileScreen';

import firebase from 'firebase/app';
import PlayerScreen from '../screens/PlayerScreen';
import DetailScreen from '../screens/DetailScreen';
import BarScreen from '../screens/BarScreen';
import { usersContext } from '../UsersContext/UserContext';
import { COLORS } from '../constants';
import SessionScreen from '../screens/SessionScreen';
import AddplayerScreen from '../screens/AddplayerScreen';

const MainStack = createStackNavigator();







var users: firebase.firestore.DocumentData[] = [];


const AppStack = ({ userId ,}: { userId: string }) => {
  const [userData, setUserData] = useState<any>();
  
  
  const [isCoach, setIsCoach] = React.useState<null | boolean>(null);
  let routeName;
  
   
  
  
    async function loadUsers() {       
                var snapshot = await firebase.firestore().collection('users').get()
      snapshot.forEach((doc) => {
              
        if (!containsObject(doc.data(), users)) {
  
                    users.push(doc.data())
                }
                if (doc.data().id === userId) {
                  console.log("-------- my profile-------")
                  console.log(doc.data())
                  setUserData(doc.data())
                  console.log("-------- my profile-------")
                  if (doc.data().status === "coach") {
                    setIsCoach(true);
                    AsyncStorage.setItem("status", "coach")
                    console.log("UPDATE STORAGE COACH STATUS")
                  } else {
                    setIsCoach(false);
                    AsyncStorage.setItem("status", "player")
                    console.log("UPDATE STORAGE PLAYER STATUS")
                  }
                  
                  
              }
            })      
    }
    function containsObject(obj:any, list:any) {
      var i;
      for (i = 0; i < list.length; i++) {
          if (list[i].id === obj.id) {
              return true;
          }
      }
  
      return false;
    }
  
  useEffect(() => {
    AsyncStorage.setItem("userId", userId)
    loadUsers()
  
    
    
  },[])
  
  if (isCoach == null) {
    return null;
  } else if (isCoach == true) {
    routeName = 'home';
  } else {
    routeName = 'player';
  }
  
  
  
  return (
    <usersContext.Provider value={users}>
      <MainStack.Navigator initialRouteName={routeName} >
      
      <MainStack.Screen name="home" component={HomeScreen} options = {{header: ()=> null}}/>
        <MainStack.Screen name="player" component={PlayerScreen} options = {{header: ()=> null}}/> 
        <MainStack.Screen name="detail" component={DetailScreen} options = {{header: ()=> null}}/>
        <MainStack.Screen name="bar" component={BarScreen} options={{ header: () => null }} />
        <MainStack.Screen name="session" component={SessionScreen} options={{ header: () => null }} />
        <MainStack.Screen name="addplayer" component={AddplayerScreen} options={{ header: () => null }} />
      </MainStack.Navigator>
      </usersContext.Provider>
    )
}

export default AppStack;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: COLORS.secondary,
      justifyContent: 'center',
    alignItems: 'center',
  },
  trendingShadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
  },
  recentContainerShadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,

      elevation: 15,
  },
  absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
  },
  
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
})
