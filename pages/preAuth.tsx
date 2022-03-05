import { StyleSheet, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { User } from '../types/user';
import { AuthenticationNavigatorParams } from '../navigators/authenticationNavigator';

export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<AuthenticationNavigatorParams, 'PreAuth'>;
export default function PreAuthPage({ route, navigation }: Props) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@spacebook_current_user');
      if (value !== null) {
        route.params.setIsAuthed(true);
      } else {
        route.params.setIsAuthed(false);
      }
    } catch (e) {
      console.log('Failed to get @spacebook_current_user');
    }
  };

  getData();

  const styles = StyleSheet.create({
    topContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.topContent}>
      <Button title="Login" onPress={() => navigation.navigate('Login', { setIsAuthed: route.params.setIsAuthed })} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
