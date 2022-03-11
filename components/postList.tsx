import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Avatar, Box, Center, Divider, FlatList, Heading, HStack, Text, VStack,
} from 'native-base';
import React from 'react';
import { ProfileNavigatorParamList } from '../navigators/profileNavigator';
import { Post } from '../types/post';
import EditPostButton from './editPostButton';
import LikePostButtons from './likePostButtons';

export type postListProps = {
  posts: Post[],
  currentUser: number,
  profileID: number
  // eslint-disable-next-line no-unused-vars
  showAlert(title: string, message: string): void
  // eslint-disable-next-line no-unused-vars
  getPosts(userID: number): void
  navigator: NativeStackNavigationProp<ProfileNavigatorParamList, 'Profile'>
};

export default function PostList(props: postListProps) {
  return (
    <Box>
      <Center>
        <Heading fontSize="xl" p="4" pb="3">
          Profile Posts
        </Heading>
      </Center>

      <FlatList
        data={props.posts}
        renderItem={({
          item,
        }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="left">
              <Avatar
                size="48px"
                source={{
                  uri: item.author.profilePictureURI,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.author.first_name}
                  {' '}
                  {item.author.last_name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  {item.author.email}
                </Text>
              </VStack>
              <Text>{item.timestamp}</Text>
            </HStack>
            <Divider my="2" />
            <Text>
              {item.text}
            </Text>
            <Text>
              Post Likes: {item.numLikes}
            </Text>
            <HStack justifyContent="space-between">
              <LikePostButtons
                getPosts={props.getPosts}
                showAlert={props.showAlert}
                postID={item.post_id}
                profileID={props.profileID}
                authorID={item.author.user_id}
                currentUserID={props.currentUser}
              />
              <EditPostButton
                navigator={props.navigator}
                getPosts={props.getPosts}
                currentProfileID={props.profileID}
                postID={item.post_id}
                authorID={item.author.user_id}
                currentUserID={props.currentUser}
              />
            </HStack>
            <Divider my="2" />

          </Box>
        )}
        keyExtractor={(item) => item.post_id.toString()}
      />
    </Box>
  );
}
