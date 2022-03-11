import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Box, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import SpaceBookAPI from '../classes/SpaceBookAPI';
import AddPostButton from '../components/addPostButton';
import PostList from '../components/postList';
import UserEditControls from '../components/profileControls';
import { SharedProfile } from '../components/sharedProfile';
import { ProfileNavigatorParamList } from '../navigators/profileNavigator';
import { Post } from '../types/post';
import { loginResponse, userInfoResponse } from '../types/responses';
import getCurrentUser from '../utils/getCurrentUser';

type Props = NativeStackScreenProps<ProfileNavigatorParamList, 'Profile'>;
export default function Profile({ navigation, route }: Props) {
  const providedUserID = route.params.userID;
  const api = new SpaceBookAPI();

  const [showEditControls, setShowEditControls] = useState<boolean>(false);
  const [user, setUser] = useState<userInfoResponse>({} as userInfoResponse);
  const [currentUser, setCurrentUser] = useState<loginResponse>({ id: 0, token: 'xxx' });
  const [needsUpdate, setNeedsUpdate] = useState<boolean>(true);
  const [showMakePost, setShowMakePost] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertTitle, setAlertTitle] = useState<string>('');

  function quickShowAlert(title: string, message: string) {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
  }

  async function getPosts(userID: number) {
    try {
      const localPosts = await api.postManagement.getPosts(userID);

      for (const post of localPosts) {
        const profileURI = await api.userManagement.getProfileImage(post.author.user_id);
        post.author.profilePictureURI = profileURI;
      }

      console.log(localPosts);
      setPosts(localPosts);
    } catch (error) {
      // TODO show error
    }
  }

  useEffect(() => {
    async function loadProfile() {
      const localCurrentUser = await getCurrentUser();
      if (localCurrentUser) {
        setCurrentUser(localCurrentUser);
      }
      let userIDToLoad = 0;
      if (providedUserID === 0) {
        if (localCurrentUser) {
          console.log('Loading currently logged in user', localCurrentUser.id);
          setShowMakePost(true);
          getPosts(localCurrentUser.id);
          userIDToLoad = localCurrentUser.id;
        }
        setShowEditControls(true);
      } else {
        userIDToLoad = providedUserID;
      }

      console.log(`loading user: ${userIDToLoad}`);

      const userResponse = await api.userManagement.getUserInfo(userIDToLoad);
      const image = await api.userManagement.getProfileImage(userIDToLoad);
      userResponse.profileURI = image;

      if (localCurrentUser && userResponse.user_id !== localCurrentUser.id) {
        console.log(`Checking if current user (${localCurrentUser.id}) is friends with: ${userResponse.user_id}`);
        const friendIDs = await api.friendManagement.getFriends(localCurrentUser.id);
        for (const friendID of friendIDs) {
          if (userResponse.user_id === friendID) {
            getPosts(userResponse.user_id);
            setShowMakePost(true);
          }
        }
      }

      setUser(userResponse);
      setNeedsUpdate(false);
    }

    // Do not run twice
    if (needsUpdate) {
      loadProfile();
    }
  }, [needsUpdate]);

  return (
    <ScrollView>
      <Box>
        <SharedProfile user={user} />
        <UserEditControls updateTrigger={setNeedsUpdate} show={showEditControls} userID={user.user_id} navigator={navigation} setIsAuthed={route.params.setIsAuthed} />
        <AddPostButton navigator={navigation} userID={user.user_id} show={showMakePost} />
        <PostList showAlert={quickShowAlert} currentUser={currentUser.id} profileID={user.user_id} posts={posts} />
      </Box>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton
        confirmText="Okay"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />

    </ScrollView>
  );
}
