import {
  getRequestBinary, getRequestJSON, patchRequestText, postRequestJSON, postRequestText,
} from '../utils/requests';
import { userInfoResponse, loginResponse, registerResponse } from '../types/responses';

export default class UserManagementAPI {
  API_BASE: string;

  constructor(apiBase: string) {
    this.API_BASE = apiBase;
  }

  async register(email: string, firstName: string, lastName: string, password: string): Promise<number> {
    const createUserResponse = await postRequestJSON(`${this.API_BASE}/user`, {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    }) as registerResponse;

    return createUserResponse.id;
  }

  async login(email: string, password: string): Promise<loginResponse> {
    const response = await postRequestJSON(`${this.API_BASE}/login`, {
      email,
      password,
    }) as loginResponse;

    return response;
  }

  async logout(): Promise<boolean> {
    await postRequestText(`${this.API_BASE}/logout`, {}, true);
    return true;
  }

  async getUserInfo(id: number): Promise<userInfoResponse> {
    const response = await getRequestJSON(`${this.API_BASE}/user/${id}`, true) as userInfoResponse;

    return response;
  }

  async getProfileImage(id: number): Promise<string> {
    const profileImage = await getRequestBinary(`${this.API_BASE}/user/${id}/photo`, true);
    return profileImage;
  }

  async updateProfile(id: number, email: string, firstName: string, lastName: string, password: string) {
    const dataToSend: any = {
      email,
      first_name: firstName,
      last_name: lastName,
    };

    // Only send a new password if one is provided
    if (password.length > 0) {
      dataToSend.password = password;
    }

    await patchRequestText(`${this.API_BASE}/user/${id}`, dataToSend, true);
  }
}
