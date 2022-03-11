import {
  View, Button,
} from 'native-base';
import React from 'react';

export type editPostButtonProps = {
  authorID: number
  currentUserID: number
};

export default function EditPostButton(props: editPostButtonProps) {
  if (props.authorID === props.currentUserID) {
    return (
      <Button>Edit</Button>
    );
  }
  return (
    <View />
  );
}
