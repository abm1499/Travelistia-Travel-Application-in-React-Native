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
  Modal,
} from 'react-native';
import { FETCH_URL } from '../../config';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {Chip} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

import {CheckBox} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
const Outside = ({navigation}) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [city, setCity] = useState([
    {name: 'Lahore', latitude: 31.5204, longitude: 74.3587, active: true},
    {name: 'Murree', latitude: 33.907, longitude: 73.3943, active: false},
  ]);
  const [places, setPlaces] = useState([]);
  const [placesR, setPlacesR] = useState([]);
  useEffect(() => {
    console.log(placesR);
  }, [placesR]);
  useEffect(() => {
    getCurrentLocation();
    // getNearby();
  }, []);
  const getNearby = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        todestination.latitude
      },${todestination.longitude}&radius=5000&type=${
        selected[Math.floor(Math.random() * selected.length)]
      }&key=${'AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'}`,
    );
    const result = await response.json();
    setPlaces(result.results);
    console.log(result.results[6].geometry.location);
  };
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
  const [data, setData] = useState([
    {selected: false, value: 'Restaurant'},
    {selected: false, value: 'Park'},
    {selected: false, value: 'Stadium'},
    {selected: false, value: 'Landscape'},
    {selected: false, value: 'Amusement'},
    {selected: false, value: 'Bank'},
    {selected: false, value: 'Bakery'},
    {selected: false, value: 'Zoo'},
  ]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [km, setKm] = useState('');
  const [budget, setBudget] = useState('');
  const update = data => {
    selected.length < 3 ? setSelected([...selected, data]) : null;
  };
  const [visible, setVisible] = useState(true);
  const [visibleR, setVisibleR] = useState(false);
  const [todestination, setTodestination] = useState({
    latitude: 31.5204,
    longitude: 74.3587,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    console.log(todestination);
  }, [todestination]);
  const updateR = async key => {
    var arr = [...city];
    for (var i = 0; i < city.length; i++) {
      arr[i].active = false;
    }
    arr[key].active = true;
    return [...arr];
  };
  const updateL = async key => {
    let arr = {...todestination};
    arr.latitude = city[key].latitude;
    arr.longitude = city[key].longitude;
    return {...arr};
  };
  return (
    <View style={Styles.body}>
      <Modal visible={visible} transparent={true}>
        <SafeAreaView
          flex={1}
          style={{alignItems: 'center', backgroundColor: 'white'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Choose interests
          </Text>
          <View style={{width: '90%', marginTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Places:</Text>
            <ScrollView
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {data.map((index, key) => (
                <Chip
                  key={key}
                  type={index.selected ? 'solid' : 'outline'}
                  title={index.value}
                  containerStyle={{marginLeft: 10, marginTop: 10}}
                  onPress={() => {
                    let arr = [...data];
                    arr[key] = {...arr[key], selected: !arr[key].selected};
                    setData([...arr]);
                    arr[key].selected
                      ? setSelected([...selected, index.value.toLowerCase()])
                      : setSelected(
                          selected.filter(
                            p => p.toLowerCase() != index.value.toLowerCase(),
                          ),
                        );
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{width: '90%', marginTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Kilometers:</Text>
            <View style={Styles.textfieldcontainer}>
              {city.map((index, key) => (
                <CheckBox
                  // center
                  key={key}
                  containerStyle={{
                    borderColor: '#fff',
                    backgroundColor: '#fff',
                  }}
                  title={index.name}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={index.active}
                  onPress={async () => {
                    const arr = await updateR(key);
                    const arr1 = await updateL(key);
                    // arr[key] = {...arr[key],arr[key]};
                    setTodestination(arr1);
                    setCity(arr);
                    // getNearby();
                    // console.log(arr1);
                  }}
                />
              ))}
            </View>
          </View>
          <View style={{width: '90%', marginTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Budget:</Text>
            <View
              style={[Styles.textfieldcontainer, {backgroundColor: '#5E9FFF'}]}>
              <TextInput
                style={Styles.textfield}
                placeholder={'0000'}
                keyboardType={'number-pad'}
                value={budget}
                onChangeText={text => setBudget(text)}
              />
            </View>
          </View>
          <Button
            title="Generate"
            disabled={selected.length == 0 || budget == '' ? true : false}
            buttonStyle={{backgroundColor: '#009688'}}
            containerStyle={{marginTop: 20, width: '50%'}}
            titleStyle={{paddingLeft: 40, paddingRight: 40}}
            onPress={() => {
              setVisible(false);
              setVisibleR(true);
              getNearby();
            }}
          />
          <Button
            title="Cancel"
            buttonStyle={{backgroundColor: 'red'}}
            containerStyle={{marginTop: 20, width: '50%'}}
            titleStyle={{paddingLeft: 40, paddingRight: 40}}
            onPress={() => navigation.pop()}
          />
        </SafeAreaView>
      </Modal>
      <Modal visible={visibleR} transparent={true}>
        <View
          flex={1}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: '#5E9FFF',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
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
              onChangeText={text => setSearch(text)}
              value={search}
            />
          </View>
          <FlatList
            // style={{marginBottom: 100}}
            data={
              search
                ? places.filter(i =>
                    i.name.toLowerCase().includes(search.toLowerCase()),
                  )
                : places
            }
            renderItem={({item, key}) => (
              <View>
                <View
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    marginBottom: 10,
                    marginTop: 10,
                    backgroundColor: '#fff',
                  }}>
                  <View>
                    <Image
                      source={{
                        uri: item.photos
                          ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
                            item?.photos[0]?.photo_reference +
                            '&key=AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'
                          : 'https://www.lsretail.com/hubfs/BLOG_drive-sales-traffic-gas-station.jpg',
                      }}
                      style={{
                        height: 200,
                        width: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                  <View
                    flex={1}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      {item.name}
                    </Text>
                    <Button
                      title="Add"
                      disabled={
                        selected.length == 0 || budget == '' ? true : false
                      }
                      buttonStyle={{backgroundColor: '#009688'}}
                      containerStyle={{marginBottom: 10, width: '50%'}}
                      titleStyle={{paddingLeft: 40, paddingRight: 40}}
                      onPress={() => {
                        // console.log(item);
                        setPlacesR([...placesR, {...item}]);
                        setPlaces(places.filter(i => i.name != item.name));
                        // setVisibleR(false);
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title="Ok"
            disabled={selected.length == 0 || budget == '' ? true : false}
            buttonStyle={{backgroundColor: 'red'}}
            containerStyle={{marginBottom: 10, width: '100%'}}
            titleStyle={{paddingLeft: 40, paddingRight: 40}}
            onPress={() => {
              setVisibleR(false);
            }}
          />
        </View>
      </Modal>
      <View style={{flex: 1, marginBottom: 0, paddingBottom: 0}}>
        <MapView
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
          {todestination ? (
            <Marker
              coordinate={{
                latitude: todestination.latitude,
                longitude: todestination.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          ) : null}
          {placesR.map((item, key) => (
            <Marker
              key={key}
              coordinate={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          ))}
          {todestination ? (
            <MapViewDirections
              origin={initialRegion}
              destination={{
                latitude: todestination.latitude,
                longitude: todestination.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              apikey={'AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'}
              strokeWidth={4}
              strokeColor="#111111"
            />
          ) : null}
          {placesR.map((item, key) => (
            <MapViewDirections
              key={key}
              origin={{
                latitude: todestination.latitude,
                longitude: todestination.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              destination={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              apikey={'AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'}
              strokeWidth={4}
              strokeColor="#111111"
            />
          ))}
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
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          height: '30%',
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <FlatList
          // style={{marginBottom: 100}}
          data={placesR}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginBottom: 10,
                  marginTop: 10,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                }}>
                <View>
                  <Image
                    source={{
                      // uri: item.icon,
                      uri: item.photos
                        ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
                          item?.photos[0]?.photo_reference +
                          '&key=AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'
                        : 'https://www.lsretail.com/hubfs/BLOG_drive-sales-traffic-gas-station.jpg',
                    }}
                    style={{
                      height: 150,
                      width: 150,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View
                  flex={1}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                  <Rating
                    imageSize={20}
                    fractions={1}
                    showRating
                    startingValue={item.rating}
                  />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
export default Outside;
