import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Box, Button } from "native-base";
import { useEffect, useState } from "react";
import UserEditControls from "../components/profileControls";
import { SharedProfile } from "../components/sharedProfile";
import { StackedTabbedParamList, TabbedRootStackParamList } from "../types/pages";
import { User } from "../types/user";
import getCurrentUser from "../utils/getCurrentUser";
import { getRequestJSON } from "../utils/requests";

type Props = NativeStackScreenProps<StackedTabbedParamList, 'Profile'>;
export default function Profile({ navigation, route }: Props) {
    let providedUserID = route.params.userID
    let [showEditControls, setShowEditControls] = useState<boolean>(false)
    let [user, setUser] = useState<User>({} as User)
    let [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    useEffect(() => {
        async function loadProfile() {
            let userIDToLoad = 0;
            if (providedUserID == 0) {
                const currentUser = await getCurrentUser()
                if (currentUser) {
                    console.log('Loaded current user', currentUser.id)
                    userIDToLoad = currentUser.id
                }
                setShowEditControls(true)
            } else {
                userIDToLoad = providedUserID
            }
            console.log('Loading user')
            const userResponse = await getRequestJSON(`http://localhost:3333/api/1.0.0/user/${userIDToLoad}`, true) as User
            setUser(userResponse)
            setNeedsUpdate(false)
        }

        loadProfile()
    }, [needsUpdate])


    return (
        <View>
            <Box>
                <SharedProfile user={user} />
                <UserEditControls updateTrigger={setNeedsUpdate} show={showEditControls} userID={user.user_id} navigator={navigation} />
            </Box>
        </View>
    )


}