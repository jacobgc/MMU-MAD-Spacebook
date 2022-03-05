import FriendManagementAPI from './FriendManagementAPI';
import UserManagementAPI from './UserManagementAPI';

export default class SpaceBookAPI {
  API_BASE: string = 'http://localhost:3333/api/1.0.0';

  userManagement: UserManagementAPI;

  friendManagement: FriendManagementAPI;

  constructor() {
    this.userManagement = new UserManagementAPI(this.API_BASE);
    this.friendManagement = new FriendManagementAPI(this.API_BASE);
  }
}
