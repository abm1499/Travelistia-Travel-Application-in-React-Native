import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Image, TextInput} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Login'), 4000);
  }, []);
  return (
    <SafeAreaView style={Styles.body}>
      <Image
        source={require('../../assets/logo.png')}
        style={{
          height: 300,
          width: 300,
        }}
      />
    </SafeAreaView>
  );
};
export default Splash;
