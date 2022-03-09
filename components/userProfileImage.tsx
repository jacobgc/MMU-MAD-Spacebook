import { View } from 'react-native';
import { Avatar } from 'native-base';
import React from 'react';

export type UserProfileImagesProps = {
    uri: string | undefined;
};

export default function UserProfileImage(props: UserProfileImagesProps) {
  return (
    <View>
      <Avatar
        bg="purple.600"
        alignSelf="center"
        size="2xl"
        source={{
          uri: props.uri,
        }}
      />
    </View>
  );
}
