import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from '../pages/login';
import PreAuthPage from '../pages/preAuth';
import RegisterPage from '../pages/register';
import { RootNavigatorParams } from './rootNavigator';

export type AuthenticationNavigatorParams = {
    PreAuth: {
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
    Login: {
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
    Register: undefined;
};

type Props = NativeStackScreenProps<RootNavigatorParams, 'Authentication'>;
export default function AuthenticationNavigator({ route }: Props) {
  const Stack = createNativeStackNavigator<AuthenticationNavigatorParams>();

  return (
    <Stack.Navigator initialRouteName="PreAuth">
      <Stack.Screen options={{ headerShown: false }} initialParams={{ setIsAuthed: route.params.setIsAuthed }} name="PreAuth" component={PreAuthPage} />
      <Stack.Screen name="Login" initialParams={{ setIsAuthed: route.params.setIsAuthed }} component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
}
