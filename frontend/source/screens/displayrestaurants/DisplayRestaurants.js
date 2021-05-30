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
import GetLocation from 'react-native-get-location';
const DisplayRestaurants = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [initialRegion, setInitialRegion] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    initialRegion.latitude != 33.6844 ? getplaces('restaurant') : null;
  }, [initialRegion]);
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
  const getplaces = async value => {
    if (initialRegion.latitude != 33.6844) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          initialRegion.latitude
        },${
          initialRegion.longitude
        }&radius=5000&type=${value}&keyword=lunch&key=${'AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'}`,
      );
      const result = await response.json();
      setPlaces(result.results);
      console.log(result.results[6]);
    }
  };
  return (
    <SafeAreaView style={Styles.body}>
      <TouchableOpacity
        style={{alignSelf: 'baseline', marginLeft: 10, marginTop: 10}}
        onPress={() => navigation.pop()}>
        <MaterialCommunityIcons name="chevron-left" size={40} color="#fff" />
      </TouchableOpacity>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
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
          style={{marginBottom: 100}}
          data={
            search
              ? places.filter(i =>
                  i.name.toLowerCase().includes(search.toLowerCase()),
                )
              : places
          }
          renderItem={({item}) => (
            <View onPress={() => setVisible(true)}>
              <View
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginBottom: 10,
                  marginTop: 10,
                  backgroundColor: '#fff',
                }}>
                <View flex={0.85}>
                  <Image
                    source={{
                      uri: item?.photos
                        ? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
                          item?.photos[0]?.photo_reference +
                          '&key=AIzaSyAHX4k9xVfM4T5HS7LP8lP92_XomVsi06U'
                        : null,
                    }}
                    style={{
                      height: 200,
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {item.vicinity}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
export default DisplayRestaurants;
