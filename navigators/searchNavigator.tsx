import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../pages/profile';
import SearchPage from '../pages/search';

export type SearchNavigatorProps = {
    Search: undefined;
    Profile: {
        userID: number
    }
}

export default function SearchNavigator() {
  const Stack = createNativeStackNavigator<SearchNavigatorProps>();

  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchPage} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
