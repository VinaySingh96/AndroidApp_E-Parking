import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TimerComponent from './Timer';
import WaterLevelComponent from './WaterLevel';

const ContainerComponent = () => {
  const [isTimerActive, setIsTimerActive] = useState(true);

  const toggleComponent = () => {
    setIsTimerActive(!isTimerActive);
  };

  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        {isTimerActive ? <TimerComponent /> : <WaterLevelComponent />}
      </View>

      <TouchableOpacity
        style={styles.slideButton}
        onPress={toggleComponent}
      >
        <Text style={styles.slideButtonText}>
          {isTimerActive ? 'Water Level' : 'Timer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  slideButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#2F80ED',
  },
  slideButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ContainerComponent;
