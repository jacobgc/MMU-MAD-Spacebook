import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box, Button, Center, CheckIcon, Select, TextArea, View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import SpaceBookAPI from '../classes/SpaceBookAPI';
import { ProfileNavigatorParamList } from '../navigators/profileNavigator';

type Props = NativeStackScreenProps<ProfileNavigatorParamList, 'AddPost'>;
export default function AddPostPage({ navigation, route }: Props) {
  const [postText, setPostText] = useState<string>('Default');
  const [drafts, setDrafts] = useState<string[]>([]);
  const [loadedDraft, setLoadedDraft] = useState<string>('');
  const api = new SpaceBookAPI();

  async function addPost() {
    if (postText.length !== 0) {
      try {
        await api.postManagement.addPost(route.params.userID, postText);
        removeDraft();
        route.params.updateTrigger(true);
        navigation.goBack();
      } catch (error) {
      // TODO show error
      }
    } else {
      // TODO show error
    }
  }

  useEffect(() => {
    async function load() {
      const loadedDrafts = await AsyncStorageLib.getItem('@spacebook_saved_posts');
      if (loadedDrafts !== null) {
        console.log(loadedDrafts);
        setDrafts(JSON.parse(loadedDrafts));
      }
    }

    load();
  }, []);

  async function removeDraft() {
    const loadedDrafts = await AsyncStorageLib.getItem('@spacebook_saved_posts');
    if (loadedDrafts !== null) {
      let parsedDrafts = JSON.parse(loadedDrafts) as string[];
      parsedDrafts = parsedDrafts.filter((item) => item !== loadedDraft);
      await AsyncStorageLib.setItem('@spacebook_saved_posts', JSON.stringify(parsedDrafts));
    }
  }

  async function loadDraft(draftText: string) {
    setLoadedDraft(draftText);
    setPostText(draftText);
  }

  async function savePost() {
    if (postText.length !== 0) {
      let loadedDrafts = await AsyncStorageLib.getItem('@spacebook_saved_posts');
      if (loadedDrafts == null) {
        const template = JSON.stringify([]);
        await AsyncStorageLib.setItem('@spacebook_saved_posts', template);
        loadedDrafts = await AsyncStorageLib.getItem('@spacebook_saved_posts');
      }

      if (loadedDrafts) {
        const realDrafts = JSON.parse(loadedDrafts) as string[];
        realDrafts.push(postText);
        setPostText('');

        AsyncStorageLib.setItem('@spacebook_saved_posts', JSON.stringify(realDrafts));
        setDrafts(realDrafts);
      }
    }
  }

  return (
    <View>
      <Center>
        <Box alignItems="center" w="100%">

          <Select
            accessibilityLabel="Select Draft"
            placeholder="Select Draft"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => loadDraft(itemValue)}
          >
            {drafts.map((item) => (<Select.Item key={item} label={item} value={item} />))}
          </Select>

          <TextArea value={postText} onChangeText={(text) => setPostText(text)} h={20} placeholder="Post Content" w="75%" />
          <Button w="75%" onPress={() => addPost()}>Post</Button>
          <Button w="75%" onPress={() => savePost()}>Save Draft</Button>

        </Box>
      </Center>
    </View>
  );
}
