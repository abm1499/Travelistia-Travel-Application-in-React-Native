import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const NearBy = ({navigation}) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [places, setPlaces] = useState([]);
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log(location);
        setInitialRegion({
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  useEffect(() => {
    getCurrentLocation();
    getplaces('restaurant');
  }, []);
  const getplaces = async value => {
    if (initialRegion.latitude != 33.6844) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          initialRegion.latitude
        },${
          initialRegion.longitude
        }&radius=10000&type=${value}&keyword=lunch&key=${'AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'}`,
      );
      const result = await response.json();
      setPlaces(result.results);
      console.log(result.results[0]);
    }
  };
  return (
    <View style={Styles.body}>
      <View style={{flex: 1, marginBottom: 0, paddingBottom: 0}}>
        <MapView
          // provider={'google'}
          style={{flex: 1}}
          initialRegion={{
            latitude: 33.6844,
            longitude: 73.0479,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={initialRegion}
          zoomEnabled={true}
          showsUserLocation={true}
          showsBuildings={true}
          showsTraffic={true}
          followUserLocation={true}
          showsCompass={false}
          zoomTapEnabled
          zoomEnabled
          showsMyLocationButton={true}
          loadingEnabled={true}>
          <Marker coordinate={initialRegion} />
        </MapView>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          position: 'absolute',
          top: Platform.OS === 'android' ? 0 : 40,
          left: 0,
          zIndex: 100,
        }}>
        <TouchableOpacity
          style={{alignSelf: 'baseline', marginLeft: 10, marginTop: 10}}
          onPress={() => navigation.pop()}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="#000" />
        </TouchableOpacity>
        <View style={{flex: 1, padding: 20}}>
          {/* <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 40,
              flex: 1,
              width: '100%',
            }}>
            <MaterialCommunityIcons
              name="magnify"
              style={{paddingLeft: 10}}
              size={25}
              color="#000"
            />
            <TextInput
              style={{padding: 10, width: '100%'}}
              placeholder={'Search'}
            />
          </View> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={{borderRadius: 60, overflow: 'hidden'}}
              onPress={() => navigation.navigate('DisplayMedical')}>
              <Image
                source={require('../../assets/medical.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderRadius: 60, overflow: 'hidden'}}
              onPress={() => navigation.navigate('DisplayGas')}>
              <Image
                source={require('../../assets/gas.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderRadius: 60, overflow: 'hidden'}}
              onPress={() => navigation.navigate('DisplayRestaurants')}>
              <Image
                source={require('../../assets/resturants.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList />
        </View>
      </View>
    </View>
  );
};
export default NearBy;
