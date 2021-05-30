import React from 'react';
import {useState} from 'react';
import {SafeAreaView, View, Text, Image, TextInput, Alert} from 'react-native';
import Styles from './Styles';
import {Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FETCH_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <View style={{marginTop: 40}}></View>
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
        <View style={{marginTop: 20}}></View>
        <Button
          title="Sign In"
          buttonStyle={{backgroundColor: '#009688'}}
          titleStyle={{paddingLeft: 40, paddingRight: 40}}
          onPress={() => {
            // navigation.replace('Home')
            var url = FETCH_URL.IP + '/signin';
            var requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email: email, password: password}),
            };
            fetch(url, requestOptions)
              .then(response => response.json())
              .then(async data => {
                if (data.token) {
                  console.log("data setting in async is  : "+data);

                  await AsyncStorage.setItem(
                    'userInformation',
                    JSON.stringify(data),
                  )
                    .then(() => {
                      console.log('Data saved');
                      console.log(data);

                      navigation.replace('Drawer');
                    })
                    .catch(error => console.log(error));
                } else {
                  Alert.alert(
                    'Login Failed',
                    'Please check your email and password',
                  );
                }
              })
              .catch(error => console.log(error));
          }}
        />
        <View style={{marginTop: 20}}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={Styles.text}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Login;
