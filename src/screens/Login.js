import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import * as theme from '../constants/Main/theme';
import { Button, Input } from '../components/Main';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
// const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = '2019bele024';
const url = 'http://10.0.2.2:8000/api/auth/login';


const Login = () => {
  const [ipAddress, setIpAddress] = useState('x');
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ email: '', password: '' });
  const navigation = useNavigation();

  const handleChange = (field, text) => {
    setInfo((prevInfo) => ({ ...prevInfo, [field]: text }));
  };
  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);
    console.log(info)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // Adding body or contents to send
        body: JSON.stringify(info)
      });
      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Invalid Credentials!', 'Please check the email and password and try login again.');
        setLoading(false)
        return;
      }
      AsyncStorage.setItem('token', data.authToken)
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
        AsyncStorage.setItem('name', data.name)
        setLoading(false)
    } catch (error) {
      console.log(error);
      Alert.alert('Oops!', 'Something went wrong. Try again');
      setLoading(false)
      return;
    }
  };

  const hasError = (key) => (error.includes(key) ? styles.hasError : null);

  return (
    <View style={[styles.flex, styles.container]}>
      <Text style={{ fontSize: theme.fonts.h1, color: theme.colors.black }}>
        Login
      </Text>
      <View style={{ marginTop: theme.sizes.margin }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={info.email}
          onChangeText={(text) => handleChange('email', text)}
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={info.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
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
