import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box, Button, Center, TextArea, View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import SpaceBookAPI from '../classes/SpaceBookAPI';
import { ProfileNavigatorParamList } from '../navigators/profileNavigator';

type Props = NativeStackScreenProps<ProfileNavigatorParamList, 'EditPost'>;
export default function EditPostPage({ navigation, route }: Props) {
  const [postText, setPostText] = useState<string>('');
  const api = new SpaceBookAPI();

  useEffect(() => {
    async function load() {
      const post = await api.postManagement.getPost(route.params.userID, route.params.postID);
      setPostText(post.text);
    }

    load();
  }, []);

  async function addPost() {
    if (postText.length !== 0) {
      try {
        await api.postManagement.editPost(route.params.userID, route.params.postID, postText);
        route.params.updateTrigger(route.params.userID);
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
          <TextArea value={postText} onChangeText={(text) => setPostText(text)} h={20} placeholder="Post Content" w="75%" />
          <Button w="75%" onPress={() => addPost()}>Update Post</Button>
        </Box>
      </Center>
    </View>
  );
}
