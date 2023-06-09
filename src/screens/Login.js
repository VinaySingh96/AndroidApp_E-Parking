import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import * as theme from '../constants/Main/theme';
import {Button, Input} from '../components/Main';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
// const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = '2019bele024';

const Login = () => {
  const [ipAddress, setIpAddress] = useState('x');
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    Keyboard.dismiss();
    setLoading(true);

    // Fake validation
    const error = [];

    // No validation needed for IP address
    //But needed for password
    if (password !== VALID_PASSWORD) {
      error.push('password');
    }

    setTimeout(() => {
      setError(error);
      setLoading(false);
    }, 1500);


    if(!ipAddress.length)
    {
Alert.alert('IP address required', 'Please enter an IP address to login.');
      setLoading(false);
      return;
    }
    else if (!error.length) {
      // Save the IP address using AsyncStorage
      AsyncStorage.setItem('ipAddress', ipAddress)
        .then(() => {
          Alert.alert('Login success!', 'Redirecting...', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Dashboard');
              },
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
          // Handle the error
        });
    }
  };

  const hasError = (key) => (error.includes(key) ? styles.hasError : null);

  return (
    <View style={[styles.flex, styles.container]}>
      <Text style={{ fontSize: theme.fonts.h1, color: theme.colors.black }}>
        Login
      </Text>
      <View style={{ marginTop: theme.sizes.margin }}>
        <Input
          label="E-mail Address"
          style={[styles.input, hasError('ipAddress')]}
          error={hasError('ipAddress')}
          value={ipAddress}
          onChangeText={(text) => setIpAddress(text)}
        />
        <Input
          secure
          label="Password"
          error={hasError('password')}
          style={[styles.input, hasError('password')]}
          defaultValue={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button gradient style={{ marginTop: theme.sizes.margin }} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={{ color: theme.colors.white, textAlign: 'center' }}>
              Login
            </Text>
          )}
        </Button>
        <Button onPress={() => navigation.navigate('Forgot Password')}>
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: theme.fonts.caption,
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}>
            Forgot your password?
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding,
    height: height,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: theme.fonts.body,
  },
  hasError: {
    borderBottomColor: 'red',
  },
});
