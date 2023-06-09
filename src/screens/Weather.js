import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import { weatherImages } from '../../constants';
import { getData, storeData } from '../../utils/asyncStorage';
import { debounce } from 'lodash';
import theme from '../../theme'
import { fetchLocations, fetchWeatherForecast } from '../../api/weather';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      fetchLocations({ cityName: search }).then((data) => {
        setLocations(data);
      });
    }
  };

  const handleLocation = (loc) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then((data) => {
      setLoading(false);
      setWeather(data);
      storeData('city', loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Srinagar';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { location, current } = weather;

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('../../assets/images/bg.png')}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      {loading ? (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {/* search section */}
          <View style={{ height: '7%', marginHorizontal: 16, zIndex: 50 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.2)' : 'transparent', borderRadius: 999 }}>
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor="lightgray"
                  style={{ paddingLeft: 6, height: 30, paddingBottom: 3, flex: 1, fontSize: 16, color: 'white' }}
                />
              ) : null}
              <TouchableOpacity onPress={() => toggleSearch(!showSearch)} style={{ borderRadius: 999, padding: 8, margin: 2, backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}>
                {showSearch ? (
                  <XMarkIcon size={25} color="white" />
                ) : (
                  <MagnifyingGlassIcon size={25} color="white" />
                )}
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View style={{ position: 'absolute', width: '100%', backgroundColor: 'gray', top: 48, borderRadius: 16 }}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0, padding: 8, paddingHorizontal: 16, marginBottom: 4, ...borderClass }}
                    >
                      <MapPinIcon size={20} color="gray" />
                      <Text style={{ color: 'black', fontSize: 20, marginLeft: 8 }}>{loc?.name}, {loc?.country}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* forecast section */}
          <View style={{ marginHorizontal: 16, justifyContent: 'space-around', flex: 1, marginBottom: 8 }}>
            {/* location */}
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
              {location?.name},
              <Text style={{ color: 'gray', fontSize: 18, fontWeight: '600' }}> {location?.country}</Text>
            </Text>
            {/* weather icon */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                source={weatherImages[current?.condition?.text || 'other']}
                style={{ width: 156, height: 156 }}
              />
            </View>
            {/* degree celcius */}
            <View style={{ alignItems: 'center' }}>
  <Text style={{ textAlign: 'center', fontSize: 60, fontWeight: 'bold', color: 'white', marginLeft: 20 }}>
    {current?.temp_c}&#176;
  </Text>
  <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, letterSpacing: 0.5 }}>
    {current?.condition?.text}
  </Text>
</View>


            {/* other stats */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/wind.png')} style={{ width: 24, height: 24 }} />
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>{current?.wind_kph}km</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/drop.png')} style={{ width: 24, height: 24 }} />
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>{current?.humidity}%</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/sun.png')} style={{ width: 24, height: 24 }} />
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* forecast for next days */}
          <View style={{ marginBottom: 8, marginHorizontal: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginBottom: 8 }}>
              <CalendarDaysIcon size={22} color="white" />
              <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                const date = new Date(item.date);
                const options = { weekday: 'long' };
                let dayName = date.toLocaleDateString('en-US', options);
                dayName = dayName.split(',')[0];

                return (
                  <View
                    key={index}
                    style={{ justifyContent: 'center', alignItems: 'center', width: 96, paddingVertical: 8, borderRadius: 16, marginRight: 8,
                     backgroundColor: theme.bgWhite(0.15)
                     }}
                  >
                    <Image
                      source={weatherImages[item?.day?.condition?.text || 'other']}
                      style={{ width: 44, height: 44 }}
                    />
                    <Text style={{ color: 'white' }}>{dayName}</Text>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
