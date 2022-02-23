import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Box, Button } from "native-base";
import { StackedTabbedParamList } from "../types/pages";
import { getRequestJSON, postRequestText } from "../utils/requests";

export type UserEditControlsProps = {
    userID: number;
    navigator: NativeStackNavigationProp<StackedTabbedParamList, "Profile">
    show: boolean
    updateTrigger: React.Dispatch<React.SetStateAction<boolean>>
};

async function handleLogout(userID: number, navigator: any) {

    postRequestText('http://localhost:3333/api/1.0.0/logout', {}, true)

    AsyncStorageLib.removeItem('@spacebook_current_user')

    navigator.navigate('PreAuth')

}

export default function UserEditControls(props: UserEditControlsProps) {
    if (props.show) {
        return (
            <View>
                <Box p="2" bg="primary.400" _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg"
                }} shadow={2}>
                    <Button onPress={() => props.navigator.navigate('AccountSettings', { userID: props.userID, updateTrigger: props.updateTrigger })}>Edit Profile</Button>
                    <Button colorScheme="secondary" onPress={() => { handleLogout(props.userID, props.navigator) }}>Log Out</Button>
                </Box>
            </View>
        )
    } else {
        return (
            <View></View>
        )
    }


}