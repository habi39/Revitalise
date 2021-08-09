import React, {useContext, useEffect, useState} from 'react';
import { View, TouchableOpacity, Image, Text, Button, StyleSheet,ScrollView,Platform, Alert , Switch} from 'react-native';
import FormInput from '../components/Forminput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import firebase from 'firebase';
const SignupScreen = ({navigation,route}:{navigation:any, route:any}) => {
    const [email, setEmail] = useState<string>();
    const [userData, setUserData] = useState<any>();
    useEffect(() => {

        setUserData(route.params)
    },[])
  return (
    
      
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}></Text>
      <Text style={styles.text}>Add Player</Text>
        
      <FormInput
          labelValue={email}
          onChangeText={(userEmail:string) => setEmail(userEmail)}
          placeholderText="Email Of Player"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
  
        
        
        
        <FormButton
          buttonTitle="Submit"
          onPress={() => signup(email,userData)}
        />
  
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}> By registering, you confirm that you accept our </Text>
                <TouchableOpacity onPress={()=>alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate,{color:'#e88832'}]}>Terms of service</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <TouchableOpacity>
                    <Text style={[styles.color_textPrivate,{color:'#e88832'}]}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
      </ScrollView>
    );
  };


export default SignupScreen;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
    },
   
    text: {
      //fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      //fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center'
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        //fontFamily: 'Lato-Regular',
        color: 'grey',
    },
  });


async function signup(email: string | undefined, userdata: any
  ) {
  if (email) {
    try {
        var snapshot = await firebase.firestore().collection('users').get();
        var arr:any[] = []
        snapshot.forEach((doc) => {
            //data.push(doc.data())
            if (doc.data().email==email) {
      
                console.log(doc.data())
                console.log(userdata.player)
                if (userdata.player.length > 0) {
                    arr = userdata.player.concat([doc.data().id])
                } else {
                    arr = [doc.data().id]
                }
                
                console.log(arr)
                
              firebase.firestore().collection('users').doc(userdata.id).update({ player: arr })
              Alert.alert(`Player added!`);
            }
        });
        
      
    } catch (error) {
      console.log(error)
      }
  } else {
    Alert.alert(`Error`, `Missing Fields`);
  }
}


