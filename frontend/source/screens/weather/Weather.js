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
} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
import GetLocation from 'react-native-get-location';
const Weather = ({navigation}) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [result, setResult] = useState(null);
  const [resultS, setResultS] = useState(null);
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
    getWeatherLocation();
  }, [initialRegion]);
  useEffect(() => {
    // getWeatherName();
  }, [search]);
  const getWeatherName = async () => {
    if (search) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=77544174e92e2eefae3fbda9feafac76`,
      );
      const result = await response.json();
      console.log('RsultS: ', result);
      setResultS(result);
    }
  };
  const getWeatherLocation = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${initialRegion.latitude}&lon=${initialRegion.longitude}&appid=77544174e92e2eefae3fbda9feafac76`,
    );
    const result = await response.json();
    setResult(result);
    console.log(result);
  };
  return (
    <SafeAreaView style={Styles.body}>
      <TouchableOpacity
        style={{alignSelf: 'baseline', marginLeft: 10, marginTop: 10}}
        onPress={() => navigation.pop()}>
        <MaterialCommunityIcons name="chevron-left" size={40} color="#fff" />
      </TouchableOpacity>
      {result ? (
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 40,
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
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
          <Button
            title="Search"
            containerStyle={{
              width: '50%',
              alignSelf: 'center',
              marginBottom: 20,
              backgroundColor: '#aaa',
            }}
            onPress={() => {
              getWeatherName(search);
            }}
          />
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Your place weather:
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#fff',
              padding: 10,
              borderRadius: 10,
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: `https://openweathermap.org/img/w/${result.weather[0].icon}.png`,
              }}
            />
            <Text style={{fontSize: 18}}>{result.name}</Text>
            <Text style={{fontSize: 18}}>{result.main.temp + ' F'}</Text>
            <Text style={{fontSize: 18}}>{result.weather[0].description}</Text>
          </View>
          {resultS ? (
            resultS.cod != 200 ? (
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Searched location weather:
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 18}}>Not found</Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Searched location weather:
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    style={{width: 100, height: 100}}
                    source={{
                      uri: `https://openweathermap.org/img/w/${resultS?.weather[0]?.icon}.png`,
                    }}
                  />
                  <Text style={{fontSize: 18}}>{resultS?.name}</Text>
                  <Text style={{fontSize: 18}}>
                    {resultS?.main?.temp + ' F'}
                  </Text>
                  <Text style={{fontSize: 18}}>
                    {resultS?.weather[0]?.description}
                  </Text>
                </View>
              </View>
            )
          ) : null}
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default Weather;
