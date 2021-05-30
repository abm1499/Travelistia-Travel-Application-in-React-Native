import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const Home = ({navigation}) => {
  return (
    <SafeAreaView style={Styles.body}>
      <TouchableOpacity
        style={{alignSelf: 'baseline', marginLeft: 10, marginTop: 10}}
        onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <View flex={0.6} style={{padding: '5%'}}>
        <View style={{flexDirection: 'row'}} width={'100%'}>
          <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
            <View
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginRight: 1,
                backgroundColor: 'powderblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/book.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text style={{fontSize: 16, textAlign: 'center'}}>Booking</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Nearby')}>
            <View
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginRight: 1,
                backgroundColor: 'powderblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/find.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text style={{fontSize: 16, textAlign: 'center'}}>
                Find Nearby
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Plan')}>
            <View
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginRight: 1,
                backgroundColor: 'powderblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/plan.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text style={{fontSize: 16, textAlign: 'center'}}>Plan Trip</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}} width={'100%'}>
          <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
            <View
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginRight: 1,
                backgroundColor: 'powderblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/weather.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text style={{fontSize: 16, textAlign: 'center'}}>Weather</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cab');
            }}>
            <View
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginRight: 1,
                backgroundColor: 'powderblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/review.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text style={{fontSize: 16, textAlign: 'center'}}>Cab</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: DeviceWidth * 0.3,
                height: DeviceWidth * 0.3,
                marginBottom: 1,
                marginRight: 1,
                backgroundColor: 'powderblue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/chatbot.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text style={{fontSize: 16, textAlign: 'center'}}>ChatBot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
