import { getRequestBinary, getRequestJSON, patchRequestText, postRequestJSON, postRequestText } from "../utils/requests"
import { userInfoResponse, loginResponse, registerResponse } from "../types/responses"
export class UserManagementAPI {

    API_BASE: string

    constructor(apiBase: string) {
        this.API_BASE = apiBase
    }


    async register(email: string, firstName: string, lastName: string, password: string): Promise<number> {

        try {
            const createUserResponse = await postRequestJSON(`${this.API_BASE}/user`, {
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "password": password
            }) as registerResponse

            return createUserResponse.id

        } catch (error) {
            throw error
        }

    }

    async login(email: string, password: string): Promise<loginResponse> {

        try {
            const loginResponse = await postRequestJSON(`${this.API_BASE}/login`, {
                "email": email,
                "password": password
            }) as loginResponse

            return loginResponse

        } catch (error) {
            throw error
        }

    }

    async logout(): Promise<boolean> {
        try {
            const logoutResponse = await postRequestText(`${this.API_BASE}/logout`, {}, true)

            return true
        } catch (error) {
            throw error
        }
    }

    async getUserInfo(id: number): Promise<userInfoResponse> {

        try {
            const userInfoResponse = await getRequestJSON(`${this.API_BASE}/user/${id}`, true) as userInfoResponse

            return userInfoResponse

        } catch (error) {
            throw error
        }

    }

    async getProfileImage(id: number): Promise<string> {

        try {
            const profileImage = await getRequestBinary(`${this.API_BASE}/user/${id}/photo`, true)
            return profileImage
        } catch (error) {
            throw error
        }

    }

    async updateProfile(id: number, email: string, firstName: string, lastName: string, password: string) {

        let dataToSend: any = {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
        }

        // Only send a new password if one is provided
        if (password.length > 0) {
            dataToSend['password'] = password
        }

        try {
            const response = await patchRequestText(`${this.API_BASE}/user/${id}`, dataToSend, true)
        } catch (error) {
            throw error
        }

    }


}