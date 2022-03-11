import FriendManagementAPI from './FriendManagementAPI';
import PostManagementAPI from './PostManagementAPI';
import UserManagementAPI from './UserManagementAPI';

export default class SpaceBookAPI {
  API_BASE: string = 'http://localhost:3333/api/1.0.0';

  userManagement: UserManagementAPI;

  friendManagement: FriendManagementAPI;

  postManagement: PostManagementAPI;

  constructor() {
    this.userManagement = new UserManagementAPI(this.API_BASE);
    this.friendManagement = new FriendManagementAPI(this.API_BASE);
    this.postManagement = new PostManagementAPI(this.API_BASE);
  }
}
