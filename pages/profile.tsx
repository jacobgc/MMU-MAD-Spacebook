import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text } from "react-native";
import { SharedProfile } from "../components/sharedProfile";
import { TabbedRootStackParamList } from "../types/pages";
import { User } from "../types/user";
import { getRequestJSON } from "../utils/requests";

type Props = BottomTabScreenProps<TabbedRootStackParamList, 'Profile'>;
export default function Profile({ navigation, route }: Props) {
    let [user, setUser] = useState<User>();
    const userID = route.params.userID

    async function getProfile() {
        try {
            const profile = await getRequestJSON(`http://localhost:3333/api/1.0.0/user/${userID}`, true) as unknown as User
            setUser(profile)
        } catch (err) {
            console.error(err)
        }
    }

    if (user == undefined) {
        getProfile()
    }



    return (
        <View>
            <SharedProfile user={user} />
        </View>
    )


}