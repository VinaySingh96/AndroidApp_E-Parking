import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const fetchData = async () => {
    try {
      await axios.get('http://192.168.170.177/led');
      console.log('API request sent successfully');
      // Handle any necessary UI updates or actions
    } catch (error) {
      console.error('Failed to send API request', error);
      // Handle any errors that occurred during the request
    }
  };

  return (
    <View>
      <Text>JSONPlaceholder API Response:</Text>
      <Button title="Fetch Data" onPress={fetchData} />
      {data.map((item) => (
        <Text key={item.id}>{item.title}</Text>
      ))}
    </View>
  );
};

export default MyComponent;
