import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import AccountSettingsPage from '../pages/accountSettings';
import AddPostPage from '../pages/addPost';
import EditPostPage from '../pages/editPost';
import Profile from '../pages/profile';
import { AuthedRootNavigatorParams } from './rootNavigator';

export type ProfileNavigatorParamList = {
    Profile: {
        userID: number,
        setIsAuthed?: React.Dispatch<React.SetStateAction<boolean>>
    }
    AccountSettings: {
      userID: number,
      updateTrigger: React.Dispatch<React.SetStateAction<boolean>>
    };
    AddPost: {
      userID: number
      updateTrigger: React.Dispatch<React.SetStateAction<boolean>>
    }
    EditPost: {
      userID: number
      postID: number
      // eslint-disable-next-line no-unused-vars
      updateTrigger: (userID: number) => void
    }
}

type Props = NativeStackScreenProps<AuthedRootNavigatorParams, 'Profile'>;
export default function ProfileNavigator({ route }: Props) {
  const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} initialParams={{ userID: route.params.userID, setIsAuthed: route.params.setIsAuthed }} options={{ headerShown: false }} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsPage} />
      <Stack.Screen name="AddPost" component={AddPostPage} />
      <Stack.Screen name="EditPost" component={EditPostPage} />

    </Stack.Navigator>
  );
}
