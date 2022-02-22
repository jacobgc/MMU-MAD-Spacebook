import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { loginResponse } from "../types/responses";

export default async function getAuthKey() {
    const currentUser = await AsyncStorageLib.getItem('@spacebook_current_user')

    if (currentUser == null) {
        return ''
    }

    const parsedUser = JSON.parse(currentUser) as loginResponse

    return parsedUser.token
}