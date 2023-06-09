import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Button, StyleSheet, ScrollView, LayoutAnimation } from 'react-native';
import cropData from '../cropData';
import * as theme from '../constants/Main/theme';
import * as Progress from 'react-native-progress';

const url = 'http://10.0.2.2:8000/api/ParkingLot/fetchAllParkingLots_admin';


const YourComponent = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [allPL,setAllPL]=useState();

  const toggleAccordion = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAllPL=async()=>{
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data)
      setAllPL(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  
  useEffect(() => {
    // Fetch and set the crop data
    fetchAllPL();
    setCrops(cropData);
  }, []);

  const handlePress=()=>{
    console.log("Book slot");
    setLoading(true);
  }

  const renderTableData = (pl) => {
    
    return (
      <View style={{}}>
        <View >
          <View style={styles.cropInfo}>
            <Text style={[styles.cropType2, { color: 'red' }]}>{'You have to pay 0.000003 etherium to book a slot.'}</Text>
            <Text style={[styles.cropType2, { color: 'black' }]}>{'Further charges will be applied according to your slot renting time.'}</Text>
          </View>
          <Button title='Book a slot' gradient style={{ marginTop: theme.sizes.margin }} onPress={handlePress}>
            <Text style={{ color: theme.colors.white, textAlign: 'center' }}>
              Book a slot
            </Text>
          </Button>
          {loading &&
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
            </View>
          }
        </View>
      </View>



    );
  };

  const cropImageMapping = {
    0: require('../assets/parkingLots/pl1.jpg'),
    1: require('../assets/parkingLots/pl2.jpg'),
    2: require('../assets/parkingLots/pl3.jpg'),
    3: require('../assets/parkingLots/pl4.jpg'),
    4: require('../assets/parkingLots/pl5.jpg'),
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a parking lot nearest to you</Text>
      <ScrollView>
        {allPL && allPL.map((pl) => (
          <View key={pl._id} style={[styles.accordionContainer]}>
            <TouchableOpacity onPress={() => toggleAccordion(pl._id)}>
              <View style={styles.accordionHeader}>
                <Image source={cropImageMapping[Math.floor((Math.random()*10)%5)]} style={styles.cropImage} />
                <View style={styles.cropInfo}>
                  <Text style={styles.cropType}>{'4km away from you.'}</Text>
                  <Text style={styles.cropName}>{pl.Name}</Text>
                  <Text style={styles.cropType2}>{`${pl.TotalSlots} free slot available`}</Text>
                  <Text style={styles.cropType2}>{`${pl.Fee} Rs/Hour`}</Text>
                </View>
                <Text style={styles.arrowIcon}>{activeAccordion === pl._id ? '-' : '+'}</Text>
              </View>
            </TouchableOpacity>
            {activeAccordion === pl._id && (
              <View style={styles.accordionContent}>
                {renderTableData(pl)}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    borderRadius: 10
  },
  accordionContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0E8388',
  },
  cropImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#0E8388",
  },
  cropInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cropType: {
    fontSize: 12,
    fontWeight: 'light',
    alignSelf: 'flex-end',
    color: "lightgreen",
    borderColor: "black",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cropType2: {
    fontSize: 12,
    fontWeight: 'light',
    alignSelf: 'flex-start',
    color: "lightgreen",
    borderColor: "black",
    // textShadowColor: 'rgba(0, 0, 0, 0.2)',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 2,
  },
  cropDescription: {
    fontSize: 14,
    color: '#D2E9E9',
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#98EECC',
  },
  accordionContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: '#333',
    textAlign: 'center',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: '#fff',
  },
  tableRowText: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: '#666',
    textAlign: 'center',
  },
  tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }

});

export default YourComponent;
