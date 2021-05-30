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
const UpdateUser = ({navigation}) => {
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
        <View style={{marginTop: 30}}></View>
        <View style={Styles.enterdetailcontainer}>
          <Text style={Styles.enterdetails}>Update details</Text>
        </View>
        <View style={{marginTop: 30}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            editable={false}
            style={Styles.textfield}
            placeholder={'Enter email'}
            value={email}
            onChangeText={email => setEmail(email)}
          />
        </View>
        {/* <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            value={password}
            placeholder={'Enter password'}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View> */}
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            value={firstname}
            placeholder={'Enter Firstname'}
            onChangeText={password => setFirstname(password)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            value={lastname}
            placeholder={'Enter Lastname'}
            onChangeText={password => setLastname(password)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            value={age.toString()}
            placeholder={'Enter Age'}
            onChangeText={password => setAge(password)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            editable={false}
            style={Styles.textfield}
            value={phonenumber}
            placeholder={'Enter Phonenumber'}
            onChangeText={password => setPhonenumber(password)}
          />
        </View>
        <View style={{marginTop: 20}}></View>
        <Button
          title="Update"
          buttonStyle={{backgroundColor: '#009688'}}
          titleStyle={{paddingLeft: 40, paddingRight: 40}}
          onPress={() => {
            var url = FETCH_URL.IP + '/user/edit/' + id;
            var requestOptions = {
              method: 'PUT',
              headers: {
                // Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                age: age,
              }),
            };
            fetch(url, requestOptions)
              .then(response => response.json())
              .then(async data => {
                console.log('my data ' + data.message);

                if (data.success) {
                  Alert.alert('Updated successfully!');
                  // navigation.replace('SignupSuccess');

                  var mydata = {
                    token: token,
                    user: {
                      email: email,
                      firstName: firstname,
                      lastName: lastname,
                      phonenumber: phonenumber,
                      age: age,
                      password: password,
                      id: id,
                    },
                  };
                  console.log(mydata);

                  await AsyncStorage.setItem(
                    'userInformation',
                    JSON.stringify(mydata),
                  );
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
export default UpdateUser;
