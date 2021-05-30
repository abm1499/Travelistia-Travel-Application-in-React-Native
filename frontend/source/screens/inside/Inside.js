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
import Styles from './Styles';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {Chip} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {Rating, AirbnbRating} from 'react-native-elements';
const Inside = ({navigation}) => {
  const [data, setData] = useState([
    {selected: false, value: 'Restaurant'},
    {selected: false, value: 'Park'},
    {selected: false, value: 'Stadium'},
    {selected: false, value: 'Hospital'},
    {selected: false, value: 'Landscape'},
    {selected: false, value: 'Amusement'},
    {selected: false, value: 'Airport'},
    {selected: false, value: 'Bank'},
    {selected: false, value: 'Bakery'},
    {selected: false, value: 'University'},
    {selected: false, value: 'Zoo'},
    {selected: false, value: 'School'},
    {selected: false, value: 'Police'},
  ]);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState([]);
  const [meters, setMeters] = useState('');
  const [time, setTime] = useState('');
  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
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
  const [places, setPlaces] = useState([]);
  return (
    <SafeAreaView style={Styles.body}>
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
          {places.map((item, key) => (
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
          {places.map((item, key) => (
            <MapViewDirections
              key={key}
              origin={initialRegion}
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
          data={places}
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
                      textAlign: 'center',
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
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Meters:</Text>
            <View style={Styles.textfieldcontainer}>
              <TextInput
                style={Styles.textfield}
                placeholder={'0 m'}
                keyboardType={'number-pad'}
                value={meters}
                onChangeText={text => setMeters(text)}
              />
            </View>
          </View>
          <View style={{width: '90%', marginTop: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Time:</Text>
            <View style={Styles.textfieldcontainer}>
              <TextInput
                style={Styles.textfield}
                placeholder={'0 hours'}
                keyboardType={'number-pad'}
                value={time}
                onChangeText={text => setTime(text)}
              />
            </View>
          </View>
          <Button
            title="Generate"
            disabled={selected.length == 0 && meters && time ? true : false}
            buttonStyle={{backgroundColor: '#009688'}}
            containerStyle={{marginTop: 20, width: '50%'}}
            titleStyle={{paddingLeft: 40, paddingRight: 40}}
            onPress={async () => {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
                  initialRegion.latitude
                },${initialRegion.longitude}&radius=${meters}&type=${
                  selected[Math.floor(Math.random() * selected.length)]
                }&key=${'AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'}`,
              );
              const result = await response.json();
              console.log(result.results);
              setPlaces(
                time == '4'
                  ? result.results.slice(0, 4)
                  : result.results.slice(0, 3),
              );
              setVisible(false);
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
    </SafeAreaView>
  );
};
export default Inside;
