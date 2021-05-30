import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../../screens/home/Home';
import UpdateUser from '../../screens/updateuser/UpdateUser';
import Login from '../../screens/login/Login';
import UpdatePassword from '../../screens/updatepassword/UpdatePassword';
Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={homeScreen} />
      <Drawer.Screen
        name="Update user"
        component={updateUserScreen}
        options={{unmountOnBlur: true}}
      />

      <Drawer.Screen
        name="Change Password"
        component={updatepasswordScreen}
        options={{unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
};
const homeScreen = ({navigation}) => <Home navigation={navigation} />;
const updateUserScreen = ({navigation}) => (
  <UpdateUser navigation={navigation} />
);
const updatepasswordScreen = ({navigation}) => (
  <UpdatePassword navigation={navigation} />
);
export default Drawer;
