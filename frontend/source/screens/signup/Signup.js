import React from 'react';
import {useState} from 'react';
import {FETCH_URL} from '../../config';

import {SafeAreaView, View, Text, Image, TextInput, Alert} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [age, setAge] = useState('');

  return (
    <SafeAreaView style={Styles.body}>
      <View style={Styles.maincontainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            height: 200,
            width: 200,
          }}
        />
        <View style={{marginTop: 30}}></View>
        <View style={Styles.enterdetailcontainer}>
          <Text style={Styles.enterdetails}>Enter detail</Text>
        </View>
        <View style={{marginTop: 30}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            placeholder={'Enter email'}
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            placeholder={'Enter password'}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            placeholder={'Enter Firstname'}
            onChangeText={password => setFirstname(password)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            placeholder={'Enter Lastname'}
            onChangeText={password => setLastname(password)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            placeholder={'Enter Age'}
            onChangeText={password => setAge(password)}
          />
        </View>
        <View style={{marginTop: 10}}></View>
        <View style={Styles.textfieldcontainer}>
          <TextInput
            style={Styles.textfield}
            placeholder={'Enter Phonenumber'}
            onChangeText={password => setPhonenumber(password)}
          />
        </View>
        <View style={{marginTop: 20}}></View>
        <Button
          title="Sign Up"
          buttonStyle={{backgroundColor: '#009688'}}
          titleStyle={{paddingLeft: 40, paddingRight: 40}}
          onPress={() => {
            var url = FETCH_URL.IP + '/signup';
            var requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstname,
                lastName: lastname,
                age: age,
                phonenumber: phonenumber,
              }),
            };
            fetch(url, requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                if (data.success) {
                  navigation.replace('SignupSuccess');
                } else {
                  Alert.alert('Signup Failed', data.message);
                }
              });
          }}
        />
        <View style={{marginTop: 20}}></View>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={Styles.text}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Signup;
