import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { Button } from '../components/Main';
import * as theme from '../constants/Main/theme';

const url = 'http://10.0.2.2:8000/api/auth/createUser';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [info, setInfo] = useState({ email: '', password: '', name: '' })

  const handleSignUp = async () => {
    // console.log(info);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    // Alert.alert('Congratulations!', 'You are now part of our i-Kissan family.');

    console.log("The form was submitted with the following data:");
    console.log(info);
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
        // setLoader(false);
        Alert.alert('Oops!', 'Looks like your email already exists. Please Login');
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
      setInfo({ email: '', password: '', name: '' });
      // localStorage.setItem('token', data.authToken);
      // setUser(data.name);
      console.log(data)
    } catch (error) {
      Alert.alert('Oops!', 'Something went wrong. Try again');
      // setLoader(false);
      console.log(error);
      return;
    }
  };
  const handleChange = (field, text) => {
    setInfo((prevInfo) => ({ ...prevInfo, [field]: text }));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={info.name}
        onChangeText={(text) => handleChange('name', text)}
        autoCapitalize='none'
        placeholderTextColor="#A9A9A9"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />
      <Button gradient onPress={handleSignUp}>
        <Text
          style={{
            color: theme.colors.white,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          Signup
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'black'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Signup;
