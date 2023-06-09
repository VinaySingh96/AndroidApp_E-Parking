import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from "react-native";
import {Block} from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-async-storage/async-storage';



const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07121B",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: screen.width / 2,
    height: screen.width / 2,
    borderWidth: 10,
    borderColor: "#89AAFF",
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom:30
  },
  buttonStop: {
    borderColor: "#FF851B",
  },
  buttonText: {
    fontSize: 45,
    color: "#89AAFF",
  },
  buttonTextStop: {
    color: "#FF851B",
  },
  timerText: {
    color: "#fff",
    fontSize: 90,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 40,
    color: "#fff",
    backgroundColor: "rgba(92, 92, 92, 0.206)",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  motorButton: {
    backgroundColor: theme.colors.button,
    width: 100,
    height: 100,
    borderRadius: 151 / 2,
    borderWidth: 5,
    borderColor: "#89AAFF"
  },
  buttonOn: {
    backgroundColor: '#FF851B',
  },
});

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return {
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  };
};



const App = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputHours, setInputHours] = useState("0");
  const [inputMinutes, setInputMinutes] = useState("0");
  const [inputSeconds, setInputSeconds] = useState("15");
  const [isMotorOn, setIsMotorOn] = useState('');
  const [waterLevel, setWaterLevel] = useState('');

  let interval = null;

  useEffect(() => {
    if (remainingSeconds === 0 && isRunning) {
      stop();
    }
  }, [remainingSeconds]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const savedIPAddress = await AsyncStorage.getItem('ipAddress');
        await axios.get(`http://${savedIPAddress}/watersensor`).then(response => {
          // console.log(response.data);
          const stringifiedData = JSON.stringify(response.data);
          setWaterLevel(stringifiedData);
        })
        .catch(error => {
          console.log(error);
        });

      } catch (error) {
        console.error('Failed to send API request', error);
      }
    };

    const interval = setInterval(fetchData, 500); // Fetch data every .5 seconds
    // console.log(waterLevel);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const start = () => {
    if(isMotorOn!=='')
    {
      motor();
      const totalSeconds =
        parseInt(inputHours, 10) * 3600 +
        parseInt(inputMinutes, 10) * 60 +
        parseInt(inputSeconds, 10);
      setRemainingSeconds(totalSeconds);
      setIsRunning(true);
    
      clearInterval(interval);
    
      interval = setInterval(() => {
        setRemainingSeconds((prevRemainingSeconds) => {
          if (prevRemainingSeconds <= 1) {
            clearInterval(interval);
            interval = null;
            setIsRunning(false);
            motor();
            return 0;
          }
          return prevRemainingSeconds - 1;
        });
      }, 1000);
    }
    else
    {
      Alert.alert('Motor status unknown!', 'Please check your motor status by pressing below motor button.');
    }
    
  };
  

  const stop = () => {
    clearInterval(interval);
    interval = null;
    setRemainingSeconds(0);
    setIsRunning(false);
  };

  const motor = async () => {
    try {
      const savedIPAddress = await AsyncStorage.getItem('ipAddress');
      // console.log(`IP address is ${savedIPAddress}`);
      
      await axios.get(`http://${savedIPAddress}/led`).then(response => {
        // console.log(response.data);
        const stringifiedData = JSON.stringify(response.data);
        if (stringifiedData === '"LED ON"') {
          SoundPlayer.playSoundFile('on', 'mp3');
          setIsMotorOn('LED OFF');
        } else if (stringifiedData === '"LED OFF"') {
          SoundPlayer.playSoundFile('off', 'mp3');
          setIsMotorOn('LED ON');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Unable to connect!', 'Please check your connection to the module.');
      });
      // await axios.get('http://192.168.170.177/led');
      console.log('API request sent successfully');
      // Handle any necessary UI updates or actions
    } catch (error) {
      console.error('Failed to send API request', error);
      // Handle any errors that occurred during the request
    }
  };

  const FanIcon = () => (
    <Image
      source={require('../assets/icons/fan.png')}
      style={{ width: 32, height: 32 }}
    />
  );
  
  const getMotorStyle = () => {
    // Conditionally return the style based on the LED status
    if (isMotorOn === 'LED ON') {
      return styles.motorButton;
    } else if (isMotorOn === 'LED OFF') {
      return styles.buttonOn;
    } else {
      return styles.motorButton;
    }
  };

  const { hours, minutes, seconds } = getRemaining(remainingSeconds);

  const isInputEmpty =
    inputHours === "" || inputMinutes === "" || inputSeconds === "";
  const isStartButtonDisabled = isRunning || isInputEmpty;

  const handleMotorButtonClick = () => {
    setIsRunning(false);
    motor();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.waterLevelText}>Water Level: {waterLevel}</Text>
      <StatusBar barStyle="light-content" />
      {isRunning ? (
        <Text style={styles.timerText}>{`${hours}:${minutes}:${seconds}`}</Text>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Hours:</Text>
          <TextInput
            style={styles.inputField}
            value={inputHours}
            onChangeText={setInputHours}
            keyboardType="numeric"
          />
          <Text style={styles.inputLabel}>Minutes:</Text>
          <TextInput
            style={styles.inputField}
            value={inputMinutes}
            onChangeText={setInputMinutes}
            keyboardType="numeric"
          />
          <Text style={styles.inputLabel}>Seconds:</Text>
          <TextInput
            style={styles.inputField}
            value={inputSeconds}
            onChangeText={setInputSeconds}
            keyboardType="numeric"
          />
        </View>
      )}
      {isRunning ? (
        <TouchableOpacity
          onPress={stop}
          style={[styles.button, styles.buttonStop]}
        >
          <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={start}
          style={[styles.button, { opacity: (isStartButtonDisabled || isMotorOn==='LED OFF')? 0.5 : 1 }]}
          disabled={isStartButtonDisabled || isMotorOn==='LED OFF'}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

<TouchableOpacity
                activeOpacity={0.5}
                onPress={handleMotorButtonClick}
              >
                <Block center middle style={[styles.motorButton, getMotorStyle()]}>
                  <FanIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5, color:'black', fontWeight:'bold' }}
                  >
                    Motor
                  </Text>
                </Block>
              </TouchableOpacity>
    </View>
  );
};

export default App;
