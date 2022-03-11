import {
  View, Button, HStack,
} from 'native-base';
import React from 'react';
import SpaceBookAPI from '../classes/SpaceBookAPI';

export type likePostButtonsProps = {
  authorID: number
  currentUserID: number
  profileID: number
  postID: number
  // eslint-disable-next-line no-unused-vars
  showAlert(title: string, message: string): void

};

export default function LikePostButtons(props: likePostButtonsProps) {
  const api = new SpaceBookAPI();

  async function likePost() {
    try {
      await api.postManagement.likePost(props.profileID, props.postID);
      props.showAlert('Post Liked Successfully', '');
    } catch (error) {
      const err = error as Error;
      if (err.message === 'Bad Request') {
        props.showAlert('Error Liking Post', 'You have already liked this post');
      } else {
        props.showAlert('Error Liking Post', 'An unknown error occurred');
      }
    }
  }

  async function unlikePost() {
    try {
      await api.postManagement.dislikePost(props.profileID, props.postID);
      props.showAlert('Post like removed Successfully', '');
    } catch (error) {
      const err = error as Error;
      if (err.message === 'Bad Request') {
        props.showAlert('Error removing like', 'You have not liked this post');
      } else {
        props.showAlert('Error removing like', 'An unknown error occurred');
      }
    }
  }

  if (props.authorID === props.currentUserID) {
    return (
      <View />
    );
  }
  return (
    <HStack>
      <Button onPress={() => likePost()}>👍</Button>
      <Button onPress={() => unlikePost()}>👎</Button>
    </HStack>
  );
}
