import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Button, StyleSheet, ScrollView, LayoutAnimation } from 'react-native';
import cropData from '../cropData';
import * as theme from '../constants/Main/theme';
import * as Progress from 'react-native-progress';
const YourComponent = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch and set the crop data
    setCrops(cropData);
  }, []);

  const handlePress=()=>{
    console.log("Book slot");
    setLoading(true);
  }

  const renderTableData = (crop) => {
    const tableData = [
      ['Weather Conditions', crop.weatherConditions],
      ['Temperature Range', crop.temperatureRange],
      ['Soil Type', crop.soilType],
      ['Water Requirements', crop.waterRequirements],
      ['High', crop.high],
      ['Medium', crop.medium],
      ['Low', crop.low],
      ['Growing Season', crop.growingSeason],
      ['Planting Depth', crop.plantingDepth],
      ['Fertilizer Requirements', crop.fertilizerRequirements],
      ['Pest and Disease Susceptibility', crop.pestAndDiseaseSusceptibility],
      ['Harvesting Time', crop.harvestingTime],
      ['Crop Rotation Recommendations', crop.cropRotationRecommendations],
      ['Storage and Post-Harvest Handling', crop.storageAndPostHarvestHandling],
      ['Common Cultivation Practices', crop.commonCultivationPractices],
    ];

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
    Rice: require('../assets/crops/rice.png'),
    Maize: require('../assets/crops/corn.png'),
    Wheat: require('../assets/crops/wheat.png'),
    Pulses: require('../assets/crops/lentils.png'),
    Sugarcane: require('../assets/crops/sugar-cane.png'),
    Cotton: require('../assets/crops/cotton.png'),
    Cotton: require('../assets/crops/cotton.png'),
    Tea: require('../assets/crops/tea.png'),
    Coffee: require('../assets/crops/coffee.png'),
    Potatoes: require('../assets/crops/potato.png'),
    Onions: require('../assets/crops/onion.png'),
    Tomatoes: require('../assets/crops/tomato.png'),
    Cauliflower: require('../assets/crops/cauliflower.png'),
    Cabbage: require('../assets/crops/cabbage.png'),
    Brinjal: require('../assets/crops/eggplant.png'),
    Okra: require('../assets/crops/okra.png'),
    Mangoes: require('../assets/crops/mango.png'),
    Lemon: require('../assets/crops/lemon.png'),
    Grapes: require('../assets/crops/grapes.png'),
    Guavas: require('../assets/crops/guava.png'),
    Papayas: require('../assets/crops/papaya.png'),
    Bananas: require('../assets/crops/banana.png'),
    Apples: require('../assets/crops/apple.png'),
    Pomegranates: require('../assets/crops/pomegranate.png'),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a parking lot nearest to you</Text>
      <ScrollView>
        {crops.map((crop, index) => (
          <View key={index} style={[styles.accordionContainer]}>
            <TouchableOpacity onPress={() => toggleAccordion(index)}>
              <View style={styles.accordionHeader}>
                <Image source={cropImageMapping[crop.cropName]} style={styles.cropImage} />
                <View style={styles.cropInfo}>
                  <Text style={styles.cropType}>{'4km away from you.'}</Text>
                  <Text style={styles.cropName}>{'Parking lot name'}</Text>
                  <Text style={styles.cropType2}>{'3 free slot available'}</Text>
                  <Text style={styles.cropDescription}>{'description/location'}</Text>
                </View>
                <Text style={styles.arrowIcon}>{activeAccordion === index ? '-' : '+'}</Text>
              </View>
            </TouchableOpacity>
            {activeAccordion === index && (
              <View style={styles.accordionContent}>
                {renderTableData(crop)}
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
    width: 50,
    height: 50,
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
