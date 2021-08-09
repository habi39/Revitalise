import React, {useContext, useState} from 'react';
import { View, TouchableOpacity, Image, Text, Button, StyleSheet,ScrollView,Platform, Alert , Switch} from 'react-native';
import FormInput from '../components/Forminput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import firebase from 'firebase';
const SignupScreen = ({navigation}:{navigation:any}) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [age, setAge] = useState<string>();
    const [height, setHeight] = useState<string>();
  const [name, setName] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [status, setStatus] = useState<boolean>();
  const [weight, setWeight] = useState<string>();
  const [coach, setCoach] = useState<string>();
  return (
    
      
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      
      <Switch onValueChange={(bool: boolean) => setStatus(bool)} value={status}></Switch>
      <Text style={styles.text}>{status?'Coach':'Player'}</Text>
        
      <FormInput
          labelValue={email}
          onChangeText={(userEmail:string) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
  
        <FormInput
          labelValue={password}
          onChangeText={(userPassword:string) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword:string) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
      />
      <FormInput
          labelValue={name}
          onChangeText={(userName:string) => setName(userName)}
          placeholderText="Name"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
      {status ? <View></View>:<View>
        <FormInput
          labelValue={age}
          onChangeText={(userAge:string) => setAge(userAge)}
          placeholderText="Age"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
        <FormInput
          labelValue={height}
          onChangeText={(userHeight:string) => setHeight(userHeight)}
          placeholderText="Height"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
        <FormInput
          labelValue={weight}
          onChangeText={(userWeight:string) => setWeight(userWeight)}
          placeholderText="Weight"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
         <FormInput
          labelValue={position}
          onChangeText={(userPosition:string) => setPosition(userPosition)}
          placeholderText="position"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
        <FormInput
          labelValue={coach}
          onChangeText={(userCoach:string) => setCoach(userCoach)}
          placeholderText="Name of Coach"
          iconType="lock"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
        />
        </View>}
        
        
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => signup(email,password,confirmPassword,age,height,status,name,weight,position,coach)}
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
  
        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => fbLogin()}
            />
  
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
                style={styles.navButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>
           Have an acount? Sign In
          </Text>
        </TouchableOpacity>
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

function googleLogin() {
  throw new Error('Function not implemented.');
}
function fbLogin() {
  throw new Error('Function not implemented.');
}

async function signup(email: string | undefined, password: string | undefined,
  confirmPassword: string | undefined, age: string | undefined, height: string | undefined,
  status: boolean | undefined, name: string | undefined, weight:string | undefined, position: string | undefined, coach: string | undefined
  ) {
  if (email && password && confirmPassword) {
    try {
      const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (user) {
        if (status) {
          await firebase.firestore().collection('users').doc(user.uid).set({email:email,password:password, id:user.uid,status:'coach',name:name})
        } else {
          await firebase.firestore().collection('users').doc(user.uid).set({email:email,password:password, id:user.uid,age:age,height:height,status:'player',name:name,weight:weight,position:position,coach:coach})
        }
        
      }
    } catch (error) {
      console.log(error)
      }
  } else {
    Alert.alert(`Error`, `Missing Fields`);
  }
}


