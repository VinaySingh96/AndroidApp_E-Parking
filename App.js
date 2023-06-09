import 'react-native-gesture-handler';
import React,{useState} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import * as theme from './src/constants/Main/theme';
import Dashboard from './src/screens/Dashboard';
import Splash from './src/screens/Splash';
import CropManual from './src/screens/CropManual';
import MotorTimer from './src/screens/MotorTimer';
import Weather from './src/screens/Weather';
import ForgotPasswordScreen from './src/screens/ForgotPassword';



const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? <Splash setIsLoading={setIsLoading}/> :
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: theme.sizes.base * 3,
            borderBottomColor: '#fff',
            shadowColor: '#000',
            backgroundColor: 'rgba(255, 255, 255, 0)', // Set the background color to white with transparency
          borderBottomWidth: 0, // Remove the bottom border
          elevation: 0, // Remove shadow on Android
          },
          headerTitleAlign: 'left',

          headerTitle: null,
          headerBackImage: () => (
            <Image source={require('./src/assets/icons/back.png')} />
          ),
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: theme.sizes.padding,
          },
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="All Parking Lots" component={CropManual} />
        <Stack.Screen name="Weather Forecasting" component={Weather}  />
        {/* <Stack.Screen name="Motor Timer" component={MotorTimer}  /> */}
        {/* <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen}  /> */}
      </Stack.Navigator>
    </NavigationContainer>;

    // <Dashboard/>
    // <Splash/>
    // <MyComponent/>
    // <CropManual/>
    // <Weather/>
  
};

export default App;




