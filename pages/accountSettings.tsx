import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, View, Stack, Input, Button } from "native-base";
import { useEffect, useState } from "react";
import { SpaceBookAPI } from "../classes/SpaceBookAPI";
import { StackedTabbedParamList } from "../types/pages";
import { userInfoResponse as userInfoResponse } from "../types/responses";
import { patchRequestText } from "../utils/requests";

type Props = NativeStackScreenProps<StackedTabbedParamList, 'AccountSettings'>;
export default function AccountSettingsPage({ navigation, route }: Props) {

    let [newEmail, setNewEmail] = useState<string>('')
    let [newFirstName, setNewFirstName] = useState<string>('')
    let [newLastName, setNewLastName] = useState<string>('')
    let [newPassword, setNewPassword] = useState<string>('')

    let [user, setUser] = useState<userInfoResponse>()

    useEffect(() => {
        async function loadProfile() {

            const api = new SpaceBookAPI()
            const userResponse = await api.userManagement.getUserInfo(route.params.userID)

            setUser(userResponse)

            setNewEmail(userResponse.email)
            setNewFirstName(userResponse.first_name)
            setNewLastName(userResponse.last_name)


        }

        loadProfile()
    }, [])

    async function updateProfile() {

        const api = new SpaceBookAPI()

        try {
            await api.userManagement.updateProfile(route.params.userID, newEmail, newFirstName, newLastName, newPassword)
            route.params.updateTrigger(true)
            navigation.navigate('Profile', { userID: route.params.userID })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View>
            <Box>
                <Stack space={4} w="100%" alignItems="center">
                    <Input mx="3" value={newEmail} onChangeText={(newText) => { setNewEmail(newText) }} placeholder="Email" w="75%" />
                    <Input mx="3" value={newFirstName} onChangeText={(newText) => { setNewFirstName(newText) }} placeholder="First Name" w="75%" />
                    <Input mx="3" value={newLastName} onChangeText={(newText) => { setNewLastName(newText) }} placeholder="Last Name" w="75%" />
                    <Input mx="3" value={newPassword} onChangeText={(newText) => { setNewPassword(newText) }} placeholder="Password" w="75%" />
                    <Button onPress={() => updateProfile()}>Update Profile</Button>
                </Stack>
            </Box>
        </View>
    )
}