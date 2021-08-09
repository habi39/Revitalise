import React from 'react';
import { Image, View, Text, Button,TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
const Dots = ({selected}:any) => {
  let backgroundColor;

  backgroundColor = selected? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
      <View 
          style={{
              width:6,
              height: 6,
              marginHorizontal: 3,
              backgroundColor
          }}
      />
  );
}

const Skip = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}
  >
      <Text style={{fontSize:16}}>Done</Text>
  </TouchableOpacity>
);

var navigation: any;
const OnboardingScreen = ({navigation}: {navigation: any}) => {
    return (
      <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
            onSkip={() => navigation.replace("Login")}
            onDone = {( )=> navigation.navigate("Login")}
        pages={[
                {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('/Users/lkm/reactNativeProject/assets/onboarding-img1.png')} />,
            title: 'Connect to the World',
            subtitle: 'Welcome to Revitalise App',
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require('/Users/lkm/reactNativeProject/assets/onboarding-img2.png')} />,
            title: 'Share Your Favorites',
            subtitle: 'Track Your Atheletic Progress',
          },
          {
            backgroundColor: '#e9bcbe',
            image: <Image source={require('/Users/lkm/reactNativeProject/assets/onboarding-img3.png')}/>,
            title: 'Become The Star',
            subtitle: "Improve your physical abilities",
          },
        ]}
      />
    );
}
export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})