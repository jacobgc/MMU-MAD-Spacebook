// User Management

export type loginResponse = {
    id: number
    token: string
}

export type registerResponse = {
    id: number
}

export type userInfoResponse = {
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    friend_count: number
    profileURI?: string
}

export type searchResponse = {
    user_id: number,
    user_givenname: string,
    user_familyname: string,
    user_email: string
}