import React,{useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Fonts from '../assets/fonts';
import SvgIcon from '../assets/images/SvgIcon';


const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = ()=>{
    setEmail('');
    Alert.alert('Password sent successfully!', 'Please check your mail for new password and try login again.');
  }

  return (
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
      <View style={{ position: 'relative', bottom: 30 }}>
        <View style={styles.loginIcon}>
          <SvgIcon icon={'forgot'} width={320} height={320} />
        </View>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>Forgot Password?</Text>
          </View>
          <View style={styles.forgotDes}>
            <Text style={styles.forgotDesLbl}>
              Don't worry! It happens, please enter the address associated with your account
            </Text>
          </View>
          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>
              <View style={styles.at}>
                <SvgIcon icon={'at'} width={20} height={20} />
              </View>
              <View style={styles.textCon}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Email ID'}
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View>
          </View>

          
            <TouchableOpacity
              style={styles.LoginBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.loginBtnLbl}>Submit</Text>
            </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  at: {
    alignSelf: 'center',
    width: '10%',
  },

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
  },

  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },

  LoginBtn: {
    backgroundColor: '#0057ff',
    borderRadius: 20,
    marginTop:10
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: '#fff',
    paddingVertical: 10,
  },

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: Fonts.type.NotoSansRegular,
  },
});

export default ForgotPasswordScreen;
