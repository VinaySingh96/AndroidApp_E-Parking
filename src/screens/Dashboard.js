import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Image, Alert, } from 'react-native';
import { Block, Text } from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundPlayer from 'react-native-sound-player';
import { useEffect } from 'react';
import { fetchWeatherForecast } from '../../api/weather';
import { getData } from '../../utils/asyncStorage';

const url = 'http://10.0.2.2:8000/api/ParkingLot/fetchAllParkingLots_admin';

const Dashboard = ({ navigation }) => {

  const [isMotorOn, setIsMotorOn] = useState('');
  const [isLightOn, setIsLightOn] = useState('');
  const [weather, setWeather] = useState({});
  const { current } = weather;

  // my data
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.log('Error retrieving name from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);


  

  const fetchAllPL=async()=>{
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      });
      const data = await response.json();
      // console.log(data)
      setAllPL(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  useEffect(() => {
    fetchAllPL();
  }, []);


  return (
    <Block style={styles.dashboard}>
      <Block column style={{ marginTop: theme.sizes.base }}>
        <Text welcome>Hi,</Text>
        <Text >{name}</Text>
      </Block>

      <Block row style={{ paddingVertical: 5 }}>
        {/* <Block flex={1} column>
          <Block flex={1.5} row style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 70, fontWeight: 'bold', color: 'black', }}>
              {current?.temp_c}
            </Text>
            <Text h1 size={34} height={80} weight='600' spacing={0.1}>°C</Text>
          </Block>
        </Block> */}

        <Block flex={1} column style={{ alignItems: 'center' }}>
          <Text caption >Your Location</Text>
          <Text color={'#0AC4BA'}>{'34.2029722, 74.2272653'}</Text>
          <Text size={15} color={'#0AC4BA'}>{'NIT Srinagar, Hazratbal, Jammu & Kashmir'}</Text>
        </Block>
      </Block>

      <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
        <Block column space="between">
          <Block row space="around" style={[{ marginVertical: theme.sizes.base },{marginTop:100}]}>
            {/* <TouchableOpacity
              activeOpacity={0.5}
              onPress={light}
            >
              <Block center middle style={[styles.button, getLightStyle()]}>
                <LightIcon size={38} />
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  Futu
                </Text>
              </Block>
            </TouchableOpacity> */}

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('All Parking Lots')}
            >
              <Block center middle style={styles.button}>
                {/* <ACIcon size={38} /> */}
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  Find Parking Spots
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>

          {/* <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Weather Forecasting')}
            >
              <Block center middle style={styles.button}>
                <TempIcon size={38} />
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  Weather
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={motor}
            >
              <Block center middle style={[styles.button, getMotorStyle()]}>
                <FanIcon size={38} />
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  Motor
                </Text>
              </Block>
            </TouchableOpacity>
          </Block> */}

          <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('All Parking Lots')}
              >
                <Block center middle style={styles.button}>
                  {/* <Timer size={38} /> */}
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Your bookings
                  </Text>
                </Block>
              </TouchableOpacity>
              
              {/* <TouchableOpacity
                activeOpacity={0.5}
                // onPress={() => navigation.navigate('DSettings', { name: 'electricity' })}
              >
                <Block center middle style={styles.button}>
                  <ElectricityIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Power Supply
                  </Text>
                </Block>
              </TouchableOpacity> */}
            </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 1,
    marginBottom: -theme.sizes.base * 6,
    backgroundColor: 'white',
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
    minHeight: 600,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 400,
    height: 151,
    borderRadius: 15,
  },
  buttonOn: {
    backgroundColor: '#0AC4BA',
  },
})
