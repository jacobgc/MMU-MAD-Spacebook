import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Box, Button } from 'native-base';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import SpaceBookAPI from '../classes/SpaceBookAPI';
import { StackedTabbedParamList } from '../types/pages';

export type UserEditControlsProps = {
    userID: number;
    navigator: NativeStackNavigationProp<StackedTabbedParamList, 'Profile'>
    setIsAuthed?: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
    updateTrigger: React.Dispatch<React.SetStateAction<boolean>>
};

async function handleLogout(userID: number, setIsAuthed?: React.Dispatch<React.SetStateAction<boolean>>) {
  const api = new SpaceBookAPI();

  await api.userManagement.logout();
  AsyncStorageLib.removeItem('@spacebook_current_user');

  if (setIsAuthed) {
    setIsAuthed(false);
  }
}

async function changeProfilePicture(userID: number, setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true,
  });

  if (!result.cancelled) {
    const response = await fetch(result.uri);
    const imgBlob = await response.blob();

    const api = new SpaceBookAPI();
    api.userManagement.updateProfileImage(userID, imgBlob, 'image/jpeg');
    setNeedsUpdate(true);
  }
}

export default function UserEditControls(props: UserEditControlsProps) {
  if (props.show) {
    return (
      <View>
        <Box
          p="2"
          bg="primary.400"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            letterSpacing: 'lg',
          }}
          shadow={2}
        >
          <Button onPress={() => props.navigator.navigate('AccountSettings', { userID: props.userID, updateTrigger: props.updateTrigger })}>Edit Profile</Button>
          <Button onPress={() => changeProfilePicture(props.userID, props.updateTrigger)}>Change Profile Image</Button>
          <Button colorScheme="secondary" onPress={() => { handleLogout(props.userID, props.setIsAuthed); }}>Log Out</Button>
        </Box>
      </View>
    );
  }
  return (
    <View />
  );
}
