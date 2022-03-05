import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Box } from "native-base";
import { useEffect, useState } from "react";
import { SpaceBookAPI } from "../classes/SpaceBookAPI";
import UserEditControls from "../components/profileControls";
import { SharedProfile } from "../components/sharedProfile";
import { ProfileNavigatorParamList } from "../navigators/profileNavigator";
import { AuthedRootNavigator } from "../navigators/rootNavigator";
import { userInfoResponse } from "../types/responses";
import getCurrentUser from "../utils/getCurrentUser";

type Props = NativeStackScreenProps<ProfileNavigatorParamList, 'Profile'>;
export default function Profile({ navigation, route }: Props) {
    let providedUserID = route.params.userID

    let [showEditControls, setShowEditControls] = useState<boolean>(false)
    let [user, setUser] = useState<userInfoResponse>({} as userInfoResponse)
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

            const api = new SpaceBookAPI()
            const userResponse = await api.userManagement.getUserInfo(userIDToLoad)

            setUser(userResponse)
            setNeedsUpdate(false)
        }

        loadProfile()
    }, [needsUpdate])


    return (
        <View>
            <Box>
                <SharedProfile user={user} />
                <UserEditControls updateTrigger={setNeedsUpdate} show={showEditControls} userID={user.user_id} navigator={navigation} setIsAuthed={route.params.setIsAuthed} />
            </Box>
        </View>
    )


}