import {
  Button, View, Text, Center, Heading, Box, FlatList, HStack, Avatar, VStack, Spacer,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import SpaceBookAPI from '../classes/SpaceBookAPI';
import { User } from '../types/user';

// type Props = NativeStackScreenProps<AuthedRootNavigatorParams, 'FriendRequests'>;
export default function FriendRequestsPage() {
  const [friendRequests, setFriendRequests] = useState<User[]>([]);
  const [update, setNeedsUpdate] = useState<number>(0);

  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('An error occurred while adding/rejecting this friend');

  const api = new SpaceBookAPI();

  useEffect(() => {
    async function loadProfile() {
      const api = new SpaceBookAPI();
      const friendRequestResponse = await api.friendManagement.getFriendRequests();
      const realResponse: User[] = [];

      for (const request of friendRequestResponse) {
        const profileURL = await api.userManagement.getProfileImage(request.user_id);
        realResponse.push({
          ...request,
          friend_count: 0,
          profilePictureURI: profileURL,
        });
      }

      setFriendRequests(realResponse);
    }

    loadProfile();
  }, [update]);

  function refreshFriendRequests() {
    setNeedsUpdate(update + 1);
  }

  async function acceptRequest(userID: number) {
    console.log(`Accepting friend request from ${userID}`);

    try {
      await api.friendManagement.acceptFriendRequest(userID);
      refreshFriendRequests();
    } catch (error) {
      setShowError(true);
    }
  }

  async function rejectRequest(userID: number) {
    console.log(`Rejecting friend request from ${userID}`);

    try {
      await api.friendManagement.rejectFriendRequest(userID);
      refreshFriendRequests();
    } catch (error) {
      setShowError(true);
    }
  }

  if (friendRequests.length > 0) {
    return (
      <View>
        <Center>
          <Spacer />
          <Button onPress={() => refreshFriendRequests()}>Refresh</Button>

          {/* Results */}
          <Box>
            <Heading fontSize="xl" p="4" pb="3">
              Results
            </Heading>
            <FlatList
              data={friendRequests}
              renderItem={({
                item,
              }) => (
                <Box
                  borderBottomWidth="1"
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack space={3} justifyContent="space-between">
                    <Avatar
                      size="48px"
                      source={{
                        uri: item.profilePictureURI,
                      }}
                    />
                    <VStack>
                      <Text
                        color="coolGray.800"
                        bold
                      >
                        {item.first_name}
                        {' '}
                        {item.last_name}
                      </Text>
                      <Text
                        color="coolGray.600"
                      >
                        {item.email}
                      </Text>
                    </VStack>

                    <Spacer />
                    <Button onPress={() => acceptRequest(item.user_id)}>✅</Button>
                    <Button onPress={() => rejectRequest(item.user_id)}>❌</Button>

                  </HStack>
                </Box>
              )}
              keyExtractor={(item) => item.user_id.toString()}
            />
          </Box>

        </Center>

        <AwesomeAlert
          show={showError}
          showProgress={false}
          title="Failed to add/remove friend"
          message={errorMessage}
          closeOnTouchOutside
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton
          confirmText="Okay"
          onConfirmPressed={() => {
            setShowError(false);
          }}
        />
      </View>
    );
  }
  return (
    <View>
      <Center>
        <Button onPress={() => refreshFriendRequests()}>Refresh</Button>
        <Text fontSize="2xl">Sorry, you have no friend requests</Text>
      </Center>
    </View>
  );
}
