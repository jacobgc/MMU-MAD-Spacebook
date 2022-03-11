import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box, Button, Center, TextArea, View,
} from 'native-base';
import React, { useState } from 'react';
import SpaceBookAPI from '../classes/SpaceBookAPI';
import { ProfileNavigatorParamList } from '../navigators/profileNavigator';

type Props = NativeStackScreenProps<ProfileNavigatorParamList, 'AddPost'>;
export default function AddPostPage({ navigation, route }: Props) {
  const [postText, setPostText] = useState<string>('');
  const api = new SpaceBookAPI();

  async function addPost() {
    if (postText.length !== 0) {
      try {
        await api.postManagement.addPost(route.params.userID, postText);
        route.params.updateTrigger(true);
        navigation.goBack();
      } catch (error) {
      // TODO show error
      }
    } else {
      // TODO show error
    }
  }

  return (
    <View>
      <Center>
        <Box alignItems="center" w="100%">
          <TextArea onChangeText={(text) => setPostText(text)} h={20} placeholder="Post Content" w="75%" maxW="300" />
          <Button w="75%" onPress={() => addPost()}>Post</Button>
        </Box>
      </Center>
    </View>
  );
}
