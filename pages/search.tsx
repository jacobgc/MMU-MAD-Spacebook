import { DrawerScreenProps } from "@react-navigation/drawer";
import { Text, Box, Stack, Input, Button, Radio, Center, Heading, FlatList, HStack, VStack, Avatar, Spacer, ScrollView, Pressable } from "native-base";
import React, { useEffect, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { SpaceBookAPI } from "../classes/SpaceBookAPI";
import AddFriendButton from "../components/addFriendButton";
import { AuthedRootNavigator } from "../navigators/rootNavigator";
import { User } from "../types/user";
import getCurrentUser from "../utils/getCurrentUser";


type Props = DrawerScreenProps<AuthedRootNavigator, 'Search'>;
export default function SearchPage({ navigation, route }: Props) {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchScope, setSearchScope] = useState<string>('all')
    const [results, setResults] = useState<User[]>([])
    const [myFriends, setMyFriends] = useState<number[]>([])
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const api = new SpaceBookAPI()

    useEffect(() => {
        async function getFriends() {
            const currentUser = await getCurrentUser()
            if (currentUser) {
                const currentFriends = await api.friendManagement.getFriends(currentUser?.id)
                setMyFriends(currentFriends)

                console.log(currentFriends)
            }
        }

        getFriends()

    }, []);

    async function search() {
        const results = await api.friendManagement.search(searchTerm, searchScope, 0)
        console.log(results)
        setResults(results)
    }

    function isNotFriend(id: number) {
        const index = myFriends.findIndex((friendID) => friendID == id)
        if (index == 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <ScrollView>
            <Stack space={4} w="100%" alignItems="center">
                <Input mx="3" value={searchTerm} onChangeText={(newText) => { setSearchTerm(newText) }} placeholder="Search Term" w="75%" />
                <Center>
                    <Text>Search Scope</Text>
                </Center>
                <Radio.Group name="myRadioGroup" accessibilityLabel="Search Scope" value={searchScope} onChange={nextValue => {
                    setSearchScope(nextValue);
                }}>
                    <Radio value="friends" my={1} bg="blue.200">
                        Friends
                    </Radio>
                    <Radio value="all" my={1} bg="blue.200">
                        All
                    </Radio>
                </Radio.Group>

                <Button onPress={() => search()}>Search</Button>
            </Stack>

            {/* Results */}
            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Results
                </Heading>
                <FlatList data={results} renderItem={({
                    item
                }) => <Box borderBottomWidth="1" _dark={{
                    borderColor: "gray.600"
                }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <HStack space={3} justifyContent="space-between">
                            <Pressable onPress={() => { navigation.navigate("Profile", { userID: item.user_id }) }}>
                                <Avatar size="48px" source={{
                                    uri: item.profilePictureURI
                                }} />
                                <VStack>
                                    <Text _dark={{
                                        color: "warmGray.50"
                                    }} color="coolGray.800" bold>
                                        {item.first_name} {item.last_name}
                                    </Text>
                                    <Text color="coolGray.600" _dark={{
                                        color: "warmGray.200"
                                    }}>
                                        {item.email}
                                    </Text>
                                </VStack>
                            </Pressable>

                            <Spacer />
                            <Center>
                                <AddFriendButton setErrorMessage={setErrorMessage} setShowError={setShowError} userID={item.user_id} disabled={isNotFriend(item.user_id)} />
                            </Center>

                        </HStack>
                    </Box>} keyExtractor={item => item.user_id.toString()} />
            </Box>

            <AwesomeAlert
                show={showError}
                showProgress={false}
                title="Adding friend failed"
                message={errorMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Try Again"
                confirmButtonColor='#E53935'
                onConfirmPressed={() => {
                    setShowError(false);
                }}
            />

        </ScrollView >
    )

}