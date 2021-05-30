import React, {useEffect} from 'react';
import {useState} from 'react';
import {SafeAreaView, View, Text, Image, TextInput, Alert} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FETCH_URL} from '../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Value} from 'react-native-reanimated';
const UpdatePassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const getUserInfo = async () => {
    await AsyncStorage.getItem('userInformation')
      .then(value => {
        const parsing = JSON.parse(value);
        console.log(Value);
        setEmail(parsing.user.email);
        setAge(parsing.user.age);
        setFirstname(parsing.user.firstName);
        setLastname(parsing.user.lastName);
        setPhonenumber(parsing.user.phonenumber);
        setId(parsing.user.id);
        setToken(parsing.token);
        // console.log(parsing);
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <SafeAreaView style={Styles.body}>
      <TouchableOpacity
        style={{alignSelf: 'baseline', marginLeft: 10, marginTop: 10}}
        onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={Styles.maincontainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            height: 150,
            width: 150,
          }}
        />
        <View style={{marginTop: 60}}></View>
        <View style={Styles.enterdetailcontainer}>
          <Text style={Styles.enterdetails}>Update password</Text>
        </View>
        <View style={{marginTop: 40}}></View>
     
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            // value={password}
            placeholder={'Enter New password'}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <View style={{marginTop: 40}}></View>
        <Button
          title="Update"
          buttonStyle={{backgroundColor: '#009688'}}
          titleStyle={{paddingLeft: 40, paddingRight: 40}}
          onPress={() => {
            var url = FETCH_URL.IP + '/user/changepassword/' + id;
            var requestOptions = {
              method: 'PUT',
              headers: {
                // Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                password: password
              }),
            };
            fetch(url, requestOptions)
              .then(response => response.json())
              .then( data => {
                console.log('my data ' + data.message);

                if (data.success) {
                  Alert.alert('Updated successfully!');
                  // navigation.replace('SignupSuccess');

                } else {
                  Alert.alert('Edit Failed', data.message);
                }
              });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default UpdatePassword;
