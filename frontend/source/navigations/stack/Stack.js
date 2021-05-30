import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import {StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../../screens/splash/Splash';
import Login from '../../screens/login/Login';
import Signup from '../../screens/signup/Signup';
import SignupSuccess from '../../screens/signupsuccess/SignupSuccess';
import Drawer from '../drawer/Drawer';
import Booking from '../../screens/booking/Booking';
import NearBy from '../../screens/nearby/NearBy';
import DisplayMedical from '../../screens/displaymedical/DisplayMedical';
import DisplayRestaurants from '../../screens/displayrestaurants/DisplayRestaurants';
import DisplayGas from '../../screens/displaygas/DisplayGas';
import Weather from '../../screens/weather/Weather';
import Plan from '../../screens/plan/Plan';
import Outside from '../../screens/outside/Outside';
import Inside from '../../screens/inside/Inside';
import Cab from '../../screens/cab/Cab';
const Stack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#5E9FFF'} barStyle={'dark-content'} />
      <Stack.Navigator
        // initialRouteName={'Splash'}
        initialRouteName={'Drawer'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={splashScreen} />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Signup" component={signupScreen} />
        <Stack.Screen name="SignupSuccess" component={signupsuccessScreen} />
        <Stack.Screen name="Drawer" component={drawerScreen} />
        <Stack.Screen name="Booking" component={bookingScreen} />
        <Stack.Screen name="Nearby" component={nearbyScreen} />
        <Stack.Screen name="DisplayMedical" component={displaymedicalScreen} />
        <Stack.Screen
          name="DisplayRestaurants"
          component={displayrestaurantsScreens}
        />
        <Stack.Screen name="DisplayGas" component={displaygasScreens} />
        <Stack.Screen name="Weather" component={weatherScreen} />
        <Stack.Screen name="Plan" component={planScreen} />
        <Stack.Screen name="Outside" component={outsideScreen} />
        <Stack.Screen name="Inside" component={insideScreen} />
        <Stack.Screen name="Cab" component={cabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const splashScreen = ({navigation}) => <Splash navigation={navigation} />;
const loginScreen = ({navigation}) => <Login navigation={navigation} />;
const signupScreen = ({navigation}) => <Signup navigation={navigation} />;
const signupsuccessScreen = ({navigation}) => (
  <SignupSuccess navigation={navigation} />
);
const drawerScreen = ({navigation}) => <Drawer navigation={navigation} />;
const bookingScreen = ({navigation}) => <Booking navigation={navigation} />;
const nearbyScreen = ({navigation}) => <NearBy navigation={navigation} />;
const displaymedicalScreen = ({navigation}) => (
  <DisplayMedical navigation={navigation} />
);
const displayrestaurantsScreens = ({navigation}) => (
  <DisplayRestaurants navigation={navigation} />
);
const displaygasScreens = ({navigation}) => (
  <DisplayGas navigation={navigation} />
);
const weatherScreen = ({navigation}) => <Weather navigation={navigation} />;
const planScreen = ({navigation}) => <Plan navigation={navigation} />;
const outsideScreen = ({navigation}) => <Outside navigation={navigation} />;
const insideScreen = ({navigation}) => <Inside navigation={navigation} />;
const cabScreen = ({navigation}) => <Cab navigation={navigation} />;

export default Stack;
