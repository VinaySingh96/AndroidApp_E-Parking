import React, {Dispatch, SetStateAction} from 'react';
import {Text, View,StyleSheet,} from 'react-native';
import LottieView from "lottie-react-native";

interface SplashProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Splash({
setIsLoading
}:SplashProps): JSX.Element{
    // const {navigation} = this.props;
    return (
        
        <View style={{flex:1,backgroundColor:'white' }}>
            <View style={{flex:0.8, alignItems:'center', margin:0}}>
        <LottieView
            source={require("../assets/splash3.json")}
            autoPlay
            loop={true}
            resizeMode='contain'
            // onAnimationFinish={navigation.navigate}
            />
            
            </View>
            <Text style={styles.heading}>i-Kissan</Text>
            <View style={{flex:0.2, alignItems:'center', margin:0}}>
<LottieView
            source={require("../assets/splash2.json")}
            autoPlay
            loop={false}
            resizeMode='contain'
            onAnimationFinish={() => setIsLoading(false)}
            />
            </View>

            
            
            

        </View>
        
    );
}

const styles = StyleSheet.create({

    heading: {
    fontFamily:'Roboto',
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf:'center',
      color:'#0AC4BA',
      letterSpacing:2,
    },
    
  });