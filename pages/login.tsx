import {
  View, Button, Input,
} from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';
import SpaceBookAPI from '../classes/SpaceBookAPI';
import { AuthenticationNavigatorParams } from '../navigators/authenticationNavigator';

export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<AuthenticationNavigatorParams, 'Login'>;
export default function LoginPage({ route }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function attemptLogin() {
    try {
      const api = new SpaceBookAPI();
      const loginResponse = await api.userManagement.login(email, password);

      console.log(loginResponse);

      await AsyncStorage.setItem('@spacebook_current_user', JSON.stringify(loginResponse));

      route.params.setIsAuthed(true);
    } catch (err) {
      const error = err as Error;

      if (error.message.includes('request must match the spec')) {
        setErrorMessage('Please ensure all fields are filled out');
      } else if (error.message.includes('Invalid email/password supplied')) {
        setErrorMessage('Invalid email/password');
      } else {
        setErrorMessage('An unknown error occurred');
      }

      setErrorMessage(error.message);
      setShowError(true);
    }
  }

  return (
    <View justifyContent="center">
      <Input placeholder="Email" onChangeText={(textVal) => { setEmail(textVal); }} />
      <Input secureTextEntry placeholder="Password" onChangeText={(textVal) => { setPassword(textVal); }} />
      <Button onPress={() => { attemptLogin(); }}>LOGIN</Button>

      <AwesomeAlert
        show={showError}
        showProgress={false}
        title="Account creation failed"
        message={errorMessage}
        closeOnTouchOutside
        closeOnHardwareBackPress
        showCancelButton={false}
        showConfirmButton
        confirmText="Try Again"
        confirmButtonColor="#E53935"
        onConfirmPressed={() => {
          setShowError(false);
        }}
      />

    </View>
  );
}
