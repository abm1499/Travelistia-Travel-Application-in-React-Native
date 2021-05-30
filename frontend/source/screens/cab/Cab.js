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

const Cab = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([
    {name: 'Umair Abbasi', number: '+923108636105'},
    {name: 'Saeed Zaib', number: '+923362074301'},
    {name: 'Umair Abbasi', number: '+923108636105'},
    {name: 'Saeed Zaib', number: '+923362074301'},
  ]);
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
              ? data.filter(i =>
                  i.name.toLowerCase().includes(search.toLowerCase()),
                )
              : data
          }
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  padding: 20,
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginTop: 10,
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    overflow: 'hidden',
                    borderRadius: 360,
                    alignSelf: 'center',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={{
                      uri: 'https://cdn.britannica.com/s:300x169,c:crop/72/126772-050-BC651FF5/Norwich-University-Hospital-Norfolk-England-National-Health.jpg',
                    }}
                    style={{
                      height: 150,
                      width: 150,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 20,
                  }}>
                  {item?.name}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {item?.number}
                </Text>
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
export default Cab;
