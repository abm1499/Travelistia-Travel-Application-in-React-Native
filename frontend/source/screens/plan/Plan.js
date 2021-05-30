import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Styles from './Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const Plan = ({navigation}) => {
  return (
    <SafeAreaView style={Styles.body}>
      <TouchableOpacity
        style={{alignSelf: 'baseline', marginLeft: 10, marginTop: 10}}
        onPress={() => navigation.pop()}>
        <MaterialCommunityIcons name="chevron-left" size={40} color="#fff" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
        width={'100%'}>
        <TouchableOpacity onPress={() => navigation.navigate('Outside')}>
          <View
            style={{
              width: DeviceWidth * 0.4,
              height: DeviceWidth * 0.4,
              marginBottom: 1,
              marginRight: 1,
              backgroundColor: 'powderblue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/destination.png')}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <Text style={{fontSize: 16, textAlign: 'center', marginTop: 10}}>
              Outside city
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Inside')}>
          <View
            style={{
              width: DeviceWidth * 0.4,
              height: DeviceWidth * 0.4,
              marginBottom: 1,
              marginRight: 1,
              backgroundColor: 'powderblue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/inside.png')}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <Text style={{fontSize: 16, textAlign: 'center', marginTop: 10}}>
              Inside city
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Plan;
