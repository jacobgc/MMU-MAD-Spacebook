import { UserManagementAPI } from "./UserManagementAPI"

export class SpaceBookAPI {

    API_BASE: string = "http://localhost:3333/api/1.0.0"
    userManagement: UserManagementAPI

    constructor() {
        this.userManagement = new UserManagementAPI(this.API_BASE)
    }

}