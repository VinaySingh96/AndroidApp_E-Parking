import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import * as theme from '../constants/Main/theme';
import { Button } from '../components/Main';

const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation, illustrations }) => {
  const scrollX = new Animated.Value(0);
  const [isShowTerm, setIsShowTerm] = useState(false);

  const renderIllustrations = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="cover"
            style={{ width: width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
      />
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={[styles.dotContainer, styles.row, { justifyContent: 'center' }]}>
        {illustrations.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dots, { opacity }]} />;
        })}
      </View>
    );
  };

  const renderTermServiceModal = () => {
    return (
      <Modal visible={isShowTerm} animationType="slide">
        <View style={[styles.flex, styles.modal]}>
          <Text style={styles.modalTitle}>Choose your Language</Text>
          <ScrollView>
            <Text style={styles.modalText}>हिंदी</Text>
            <Text style={styles.modalText}>اردو</Text>
            <Text style={styles.modalText}>English</Text>
          </ScrollView>
          <View>
            <Button gradient onPress={() => setIsShowTerm(false)}>
              <Text style={styles.modalButton}>I Understand</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, styles.flex]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Your Farm.
          <Text style={styles.headerTextBold}> Greener.</Text>
        </Text>
        <Text style={styles.subHeaderText}>Enjoy the experience.</Text>
      </View>
      <ScrollView>
        <View style={styles.illustrations}>
          {renderIllustrations()}
          {renderDots()}
        </View>
        <View style={[styles.btnContainer, { marginHorizontal: theme.sizes.padding * 2 }]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('Signup')}>
            <Text style={{
                  textAlign: 'center',
                  color: theme.colors.gray
                }}>Sign Up</Text>
          </Button>
          <Button onPress={() => setIsShowTerm(true)}>
            <Text style={{
                  textAlign: 'center',
                  color: theme.colors.gray
                }}>भाषा चुने</Text>
                <Text style={{
                  textAlign: 'center',
                  color: theme.colors.gray
                }}>زبان منتخب کریں۔</Text>
                <Text style={{
                      textAlign: 'center',
                      color: theme.colors.gray
                    }}>Select Language</Text>
          </Button>
        </View>
        {renderTermServiceModal()}
      </ScrollView>
    </View>
  );
};

Welcome.defaultProps = {
  illustrations: [
    {
      id: 1,
      source: require('../assets/images/illustration_1.png'),
    },
    {
      id: 2,
      source: require('../assets/images/illustration_2.png'),
    },
    {
      id: 3,
      source: require('../assets/images/illustration_3.png'),
    },
  ],
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
  },
  header: {
    flex: 2,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: theme.colors.black,
    fontSize: theme.fonts.h1,
  },
  headerTextBold: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: theme.colors.gray,
    fontSize: theme.fonts.h2,
  },
  illustrations: {
    flex: 6,
  },
  btnContainer: {
    flex: 2,
  },
  dotContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    left: 0,
    right: 0,
  },
  dots: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    backgroundColor: theme.colors.gray,
  },
  modal: {
    height: height * 0.8,
    paddingVertical: theme.sizes.padding * 2,
    paddingHorizontal: theme.sizes.padding,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: theme.fonts.h1,
    color: theme.colors.gray,
    marginBottom: 80,
  },
  modalText: {
    color: theme.colors.gray,
    fontSize: theme.fonts.h2,
    marginVertical: 20,
    alignSelf:'center'
  },
  modalButton: {
    color: theme.colors.white,
    textAlign: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Welcome;
