import { Post } from '../types/post';
import {
  deleteRequestText, getRequestJSON, patchRequestText, postRequestJSON, postRequestText,
} from '../utils/requests';

export default class PostManagementAPI {
  API_BASE: string;

  constructor(apiBase: string) {
    this.API_BASE = apiBase;
  }

  async addPost(userID: number, postText: string): Promise<object> {
    return postRequestJSON(`${this.API_BASE}/user/${userID}/post`, {
      text: postText,
    }, true);
  }

  async editPost(userID: number, postID: number, postText: string): Promise<string> {
    return patchRequestText(`${this.API_BASE}/user/${userID}/post/${postID}`, {
      text: postText,
    }, true);
  }

  async getPosts(userID: number): Promise<Post[]> {
    return getRequestJSON(`${this.API_BASE}/user/${userID}/post`, true) as Promise<Post[]>;
  }

  async getPost(userID: number, postID: number): Promise<Post> {
    return getRequestJSON(`${this.API_BASE}/user/${userID}/post/${postID}`, true) as Promise<Post>;
  }

  async likePost(userID: number, postID: number): Promise<string> {
    return postRequestText(`${this.API_BASE}/user/${userID}/post/${postID}/like`, {}, true);
  }

  async dislikePost(userID: number, postID: number): Promise<string> {
    return deleteRequestText(`${this.API_BASE}/user/${userID}/post/${postID}/like`, {}, true);
  }

  async deletePost(userID: number, postID: number): Promise<string> {
    return deleteRequestText(`${this.API_BASE}/user/${userID}/post/${postID}`, {}, true);
  }
}
