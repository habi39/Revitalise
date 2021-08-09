import React, {useContext, useState} from 'react';
import { View, TouchableOpacity, Image, Text, Button, StyleSheet,ScrollView,Platform, Alert } from 'react-native';
import FormInput from '../components/Forminput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import firebase from 'firebase';
const LoginScreen = ({navigation}:{navigation:any}) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('/Users/lkm/reactNativeProject/assets/rn-social-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Revitalise</Text>
  
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
  
        <FormButton
          buttonTitle="Sign In"
          onPress={() => login(email, password)}
        />
  
        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
  
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
      paddingTop: 50
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
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
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      //fontFamily: 'Lato-Regular',
    },
  });

async function login(email: string | undefined, password: string | undefined) {
  if(email&&password){
    const {user}=  await firebase.auth().signInWithEmailAndPassword(email, password);
  } else {
    Alert.alert(`Missing Fields`);
  }
}
function googleLogin() {
  throw new Error('Function not implemented.');
}
function fbLogin() {
  throw new Error('Function not implemented.');
}

