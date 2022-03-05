import { View } from 'react-native';
import { Avatar } from 'native-base';
import React, { useEffect, useState } from 'react';
import SpaceBookAPI from '../classes/SpaceBookAPI';

export type UserProfileImagesProps = {
    userID: number | undefined;
};

export default function UserProfileImage(props: UserProfileImagesProps) {
  const [profileImage, setProfileImage] = useState<string>();

  useEffect(() => {
    async function getImage() {
      if (props.userID !== undefined) {
        const api = new SpaceBookAPI();
        const image = await api.userManagement.getProfileImage(props.userID);

        setProfileImage(image);
      }
    }

    getImage();
  }, [props.userID]);

  return (
    <View>
      <Avatar
        bg="purple.600"
        alignSelf="center"
        size="2xl"
        source={{
          uri: profileImage,
        }}
      />

    </View>
  );
}
