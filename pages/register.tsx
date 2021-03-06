import {
  View, Button, Input,
} from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { User } from '../types/user';
import { StackedRootStackParamList } from '../types/pages';
import SpaceBookAPI from '../classes/SpaceBookAPI';

export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<StackedRootStackParamList, 'Register'>;
export default function RegisterPage({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  async function register() {
    // TODO validation

    try {
      const api = new SpaceBookAPI();

      api.userManagement.register(email, firstName, lastName, password);

      setShowSuccess(true);
    } catch (err) {
      const error = err as Error;
      if (error.message.includes('Possibly duplicate entry')) {
        setErrorMessage('Provided email already has an account');
      } else if (error.message.includes('email must be valid and password greater than 5 characters')) {
        setErrorMessage('Email must be valid and password must be greater than 5 characters');
      } else if (error.message.includes('email must be correct')) {
        setErrorMessage('Please ensure all fields are filled out');
      } else {
        setErrorMessage('An unknown error occurred');
      }
      setShowError(true);
    }
  }

  function goToLogin() {
    navigation.navigate('Login');
  }

  return (
    <View>

      <Input placeholder="First Name" onChangeText={(textVal) => { setFirstName(textVal); }} />
      <Input placeholder="Last Name" onChangeText={(textVal) => { setLastName(textVal); }} />
      <Input placeholder="Email" onChangeText={(textVal) => { setEmail(textVal); }} />
      <Input secureTextEntry placeholder="Password" onChangeText={(textVal) => { setPassword(textVal); }} />
      <Input secureTextEntry placeholder="Confirm Password" onChangeText={(textVal) => { setConfirmPassword(textVal); }} />

      <Button onPress={() => { register(); }}>Register</Button>

      <AwesomeAlert
        show={showSuccess}
        showProgress={false}
        title="Account Created"
        message="An account has been created, please log in to continue"
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton
        confirmText="Okay"
        onConfirmPressed={() => {
          goToLogin();
        }}
      />

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
