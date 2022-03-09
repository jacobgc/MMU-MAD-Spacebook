import { friendRequestsResponse, searchResponse } from '../types/responses';
import { User } from '../types/user';
import { deleteRequestText, getRequestJSON, postRequestText } from '../utils/requests';
import SpaceBookAPI from './SpaceBookAPI';

export default class FriendManagementAPI {
  API_BASE: string;

  pageLimit: number = 20;

  constructor(apiBase: string) {
    this.API_BASE = apiBase;
  }

  async search(searchTerm: string, searchScope: string, offset: number): Promise<User[]> {
    const api = new SpaceBookAPI();
    const realResults: User[] = [];
    const results = await getRequestJSON(`${this.API_BASE}/search?q=${searchTerm}&search_in=${searchScope}&limit=${this.pageLimit}&offset=${offset}`, true) as searchResponse[];

    for (const result of results) {
      const profilePictureURI = await api.userManagement.getProfileImage(result.user_id);

      realResults.push({
        user_id: result.user_id,
        email: result.user_email,
        first_name: result.user_givenname,
        last_name: result.user_familyname,
        friend_count: 0,
        profilePictureURI,
      });
    }

    return realResults;
  }

  async getFriends(userID: Number): Promise<number[]> {
    const results = await getRequestJSON(`${this.API_BASE}/user/${userID}/friends`, true) as searchResponse[];
    const realResults: number[] = [];

    for (const result of results) {
      realResults.push(result.user_id);
    }

    return realResults;
  }

  async getFriendRequests() {
    const results = await getRequestJSON(`${this.API_BASE}/friendrequests`, true) as friendRequestsResponse[];

    return results;
  }

  /**
   * Accepts a friend request from the given user
   *
   * Note: Will only fail on network error
   */
  async acceptFriendRequest(userID: number) {
    await postRequestText(`${this.API_BASE}/friendrequests/${userID}`, {}, true);
  }

  /**
   * Rejects a friend request from the given user
   *
   * Note: Will only fail on network error
   */
  async rejectFriendRequest(userID: number) {
    await deleteRequestText(`${this.API_BASE}/friendrequests/${userID}`, {}, true);
  }

  async addFriend(id: number): Promise<string> {
    try {
      const addFriendResponse = await postRequestText(`${this.API_BASE}/user/${id}/friends`, {}, true);

      if (addFriendResponse === 'User is already added as a friend') {
        throw new Error(addFriendResponse);
      }

      return addFriendResponse;
    } catch (error) {
      console.log('Caught Error');
      throw error;
    }
  }
}
