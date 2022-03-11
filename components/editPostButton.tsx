import {
  View, Button, HStack,
} from 'native-base';
import React from 'react';
import SpaceBookAPI from '../classes/SpaceBookAPI';

export type editPostButtonProps = {
  authorID: number
  currentProfileID: number
  postID: number
  currentUserID: number
  // eslint-disable-next-line no-unused-vars
  getPosts(userID: number): void

};

export default function EditPostButton(props: editPostButtonProps) {
  const api = new SpaceBookAPI();
  async function deletePost() {
    try {
      await api.postManagement.deletePost(props.currentProfileID, props.postID);
      props.getPosts(props.currentProfileID);
    } catch (error) {
      console.error(error);
    }
  }

  if (props.authorID === props.currentUserID) {
    return (
      <HStack justifyContent="space-between">
        <Button>Edit</Button>
        <Button backgroundColor="danger.700" onPress={() => deletePost()}>🗑️</Button>
      </HStack>
    );
  }
  return (
    <View />
  );
}
