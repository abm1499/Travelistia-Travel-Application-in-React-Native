import React, {useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
import stripe from 'react-native-stripe-payments';
import {CreditCardInput} from 'react-native-input-credit-card';
import GetLocation from 'react-native-get-location';
import {data} from './hotels';
const Booking = ({navigation}) => {
  stripe.setOptions({
    publishingKey:
      'pk_test_51I0nR6IpSAU7SrUWXLAhMpV7VWmeaeJst4UUMybOcM3aO7U6K7quubVd5QgJFihUzvX6kOHQHgDPLHKKj9oYY9p8006zpwihJV',
  });
  const pay = () => {
    console.log('here');
    const isCardValid = stripe.isCardValid({
      number: '4242424242424242',
      expMonth: 10,
      expYear: 21,
      cvc: '888',
    });
    if (isCardValid) {
      Alert.alert(
        'Success',
        'Payment made.',

        {text: 'OK'},
      );
      setVisible(false);
    } else {
      Alert.alert(
        'Fail',
        'Payment not made.',

        {text: 'OK'},
      );
    }
  };
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({});
  const _onChange = form => {
    console.log(form);
    setForm(form);
  };
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
  const [places, setPlaces] = useState(data);
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
      // setPlaces(result.results);
      // console.log(result.results[6]);
    }
  };
  return (
    <SafeAreaView style={Styles.body}>
      <TouchableOpacity
        style={{alignSelf: 'baseline', marginLeft: 10, marginTop: 10}}
        onPress={() => navigation.pop()}>
        <MaterialCommunityIcons name="chevron-left" size={40} color="#fff" />
      </TouchableOpacity>
      <Modal visible={visible} transparent>
        <View
          flex={1}
          style={{backgroundColor: '#5E9FFF', justifyContent: 'center'}}>
          <CreditCardInput onChange={_onChange} />
          <Button
            containerStyle={{width: '60%', alignSelf: 'center'}}
            title="Book"
            disabled={form.valid ? false : true}
            onPress={() => pay()}
          />
          <Button
            containerStyle={{width: '60%', marginTop: 20, alignSelf: 'center'}}
            title="Cancel"
            onPress={() => setVisible(false)}
          />
        </View>
      </Modal>
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
                  i.HotelName.toLowerCase().includes(search.toLowerCase()),
                )
              : places
          }
          renderItem={({item, key}) => (
            <TouchableOpacity onPress={() => setVisible(true)}>
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
                      uri: item.imageUrl,
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
                    {item.HotelName}
                  </Text>
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
                      textAlign: 'center',
                    }}>
                    {item.hotelAdress}
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
                    {'Rs: ' + item.pkrPerNight + ' /-'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
export default Booking;
