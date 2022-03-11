import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View, Center, Button, Divider,
} from 'native-base';
import React from 'react';
import { ProfileNavigatorParamList } from '../navigators/profileNavigator';

export type AddPostProps = {
    show: boolean,
    navigator: NativeStackNavigationProp<ProfileNavigatorParamList, 'Profile'>,
    userID: number
};

export default function AddPostButton(props: AddPostProps) {
  if (props.show) {
    return (
      <View>
        <Divider my="2" />
        <Center>
          <Button w="75%" onPress={() => props.navigator.navigate('AddPost', { userID: props.userID })}>Add New Post</Button>
        </Center>
      </View>
    );
  }
  return (
    <View />
  );
}
