import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import AuthenticationNavigator from './authenticationNavigator';
import ProfileNavigator from './profileNavigator';
import SearchNavigator from './searchNavigator';

export type RootNavigatorParams = {
    // No Auth Required
    Authentication: {
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
}

export type AuthedRootNavigatorParams = {
    Profile: {
        userID: number
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
    Search: undefined;
}

export default function RootNavigator() {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const Drawer = createDrawerNavigator<RootNavigatorParams>();
  const AuthedDrawer = createDrawerNavigator<AuthedRootNavigatorParams>();

  if (!isAuthed) {
    return (
      <Drawer.Navigator initialRouteName="Authentication">
        <Drawer.Group>
          <Drawer.Screen initialParams={{ setIsAuthed }} name="Authentication" component={AuthenticationNavigator} />
        </Drawer.Group>
      </Drawer.Navigator>
    );
  }
  return (
    <AuthedDrawer.Navigator initialRouteName="Profile">
      <AuthedDrawer.Group>
        <AuthedDrawer.Screen name="Profile" options={{ headerTitle: 'My Profile' }} initialParams={{ userID: 0, setIsAuthed }} component={ProfileNavigator} />
        <AuthedDrawer.Screen name="Search" component={SearchNavigator} />
      </AuthedDrawer.Group>

    </AuthedDrawer.Navigator>
  );
}
