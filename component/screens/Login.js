/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useSyncExternalStore} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {postData} from '../../services/FetchNodeServices';
import Input from '../uicomponents/Input';
import AppButton from '../uicomponents/AppButton';
import {storeData} from '../storage/AsyncStroage';
const {width, height} = Dimensions.get('window');

function Login({navigation, props}) {
  const [inputs, setInputs] = useState({mobileEmail: '', password: ''});
  const [error, setError] = useState({});
  const validate = () => {
    var isValid = true;
    if (!inputs.mobileEmail) {
      handleErrors('Pls input emailid/mobile number..', 'mobileEmail');
      isValid = false;
    }
    if (!inputs.password) {
      handleErrors('Pls input password..', 'password');
      isValid = false;
    }
    return isValid;
  };

  const handleClick = async () => {
    if (validate()) {
      var result = await postData('user/check_user_mobileno', {
        mobileno: inputs.mobileEmail,
      });
      if (result.status) {
        storeData('USER', result.data);
        navigation.navigate('Home1');
      } else {
        alert('Invalid Password/Emailid/Mobile Number');
      }
    }
  };
  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.25,
      }}>
      <Input
        error={error.mobileEmail}
        onFocus={() => handleErrors(null, 'mobileEmail')}
        onChangeText={txt => handleValues(txt, 'mobileEmail')}
        iconName="email"
        placeholderTextColor="black"
        labelTxt="EmailId/Mobile"
        placeholder="Email Address/Mobile Number"
      />
      <Input
        error={error.password}
        onFocus={() => handleErrors(null, 'password')}
        onChangeText={txt => handleValues(txt, 'password')}
        iconName="lock"
        placeholderTextColor="black"
        labelTxt="Password"
        // securet=true
        secureTextEntry={true}
        placeholder="Password"
      />
      <AppButton
        onPress={handleClick}
        btnWidth={0.8}
        buttonText={'Sign in'}
        bgColor="#e67e22"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#f2f2f2',
    padding: 10,
    marginTop: 10,
  },
});

export default Login;
