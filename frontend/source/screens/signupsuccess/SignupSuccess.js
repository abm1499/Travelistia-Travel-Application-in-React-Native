import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Image, TextInput} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
const SignupSuccess = ({navigation}) => {
  useEffect(() => setTimeout(() => navigation.pop(), 2000), []);
  return (
    <SafeAreaView style={Styles.body}>
      <Image
        source={require('../../assets/signup.png')}
        style={{
          height: 200,
          width: 200,
        }}
      />
      <Text
        style={{
          marginTop: 20,
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Registration Successfull
      </Text>
    </SafeAreaView>
  );
};
export default SignupSuccess;
