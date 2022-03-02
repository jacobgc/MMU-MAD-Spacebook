import { searchResponse } from "../types/responses";
import { User } from "../types/user";
import { getRequestJSON, postRequestText } from "../utils/requests";
import { SpaceBookAPI } from "./SpaceBookAPI";

export class FriendManagement {

    API_BASE: string
    pageLimit: number = 20;

    constructor(apiBase: string) {
        this.API_BASE = apiBase
    }

    async search(searchTerm: string, searchScope: string, offset: number): Promise<User[]> {

        const api = new SpaceBookAPI()

        try {
            let realResults: User[] = []
            const results = await getRequestJSON(`${this.API_BASE}/search?q=${searchTerm}&search_in=${searchScope}&limit=${this.pageLimit}&offset=${offset}`, true) as searchResponse[]

            for (const result of results) {

                const profilePictureURI = await api.userManagement.getProfileImage(result.user_id)

                realResults.push({
                    user_id: result.user_id,
                    email: result.user_email,
                    first_name: result.user_givenname,
                    last_name: result.user_familyname,
                    friend_count: 0,
                    profilePictureURI: profilePictureURI
                })
            }

            return realResults
        } catch (err) {
            throw err
        }

    }

    async getFriends(userID: Number): Promise<number[]> {
        try {
            const results = await getRequestJSON(`${this.API_BASE}/user/${userID}/friends`, true) as searchResponse[]
            let realResults: number[] = []

            for (const result of results) {
                realResults.push(result.user_id)
            }

            return realResults

        } catch (error) {
            throw error
        }
    }

    async addFriend(id: number): Promise<string> {
        try {
            const addFriendResponse = await postRequestText(`${this.API_BASE}/user/${id}/friends`, {}, true)

            if (addFriendResponse == "User is already added as a friend") {
                throw new Error(addFriendResponse)
            }

            return addFriendResponse

        } catch (error) {
            console.log("Caught Error")
            throw error
        }
    }

}
