import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { loginResponse } from "../types/responses";

export default async function getCurrentUser(): Promise<loginResponse | null> {

    const currentUser = await AsyncStorageLib.getItem('@spacebook_current_user')
    if (currentUser) {
        const parsedCurrentUser = JSON.parse(currentUser) as loginResponse
        return parsedCurrentUser
    } else {
        return null
    }

}