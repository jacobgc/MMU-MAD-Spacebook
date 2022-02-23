import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, View, Stack, Input, Button } from "native-base";
import { useEffect, useState } from "react";
import { StackedTabbedParamList } from "../types/pages";
import { User } from "../types/user";
import { getRequestJSON, patchRequestText } from "../utils/requests";

type Props = NativeStackScreenProps<StackedTabbedParamList, 'AccountSettings'>;
export default function AccountSettingsPage({ navigation, route }: Props) {

    let [newEmail, setNewEmail] = useState<string>('')
    let [newFirstName, setNewFirstName] = useState<string>('')
    let [newLastName, setNewLastName] = useState<string>('')
    let [newPassword, setNewPassword] = useState<string>('')

    let [user, setUser] = useState<User>()

    useEffect(() => {
        async function loadProfile() {
            console.log('Loading profile', route.params.userID)
            const userResponse = await getRequestJSON(`http://localhost:3333/api/1.0.0/user/${route.params.userID}`, true) as User
            setUser(userResponse)

            setNewEmail(userResponse.email)
            setNewFirstName(userResponse.first_name)
            setNewLastName(userResponse.last_name)


        }

        loadProfile()
    }, [])

    async function updateProfile() {

        let dataToSend: any = {
            "email": newEmail,
            "first_name": newFirstName,
            "last_name": newLastName,
        }

        // Only send a new password if one is provided
        if (newPassword.length > 0) {
            dataToSend['password'] = newPassword
        }

        try {
            await patchRequestText(`http://localhost:3333/api/1.0.0/user/${route.params.userID}`, dataToSend, true)
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