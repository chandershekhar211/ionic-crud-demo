import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BehaviorSubject, map } from 'rxjs';
import { User } from './auth.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  async userIsAuthenticated(): Promise<boolean> {
    const storedData = await Preferences.get({ key: 'authData' });
    if (!storedData || !storedData.value) {
      return !!null;
    }
    const userInfo = JSON.parse(storedData.value) as {
      userId: string;
      email: string;
    };
    if (!userInfo) {
      return false;
    }
    return !!userInfo.userId;
  }

  constructor(private storage: StorageService) {}

  async login(email: string, password: string) {
    const users = await this.storage.get('users');
    if(!users) {
      return {
        status: 'ERROR',
        message: 'Invalid Login credentails. Please try again after some time!',
      };
    }
    const loggedInUser = users.find(
      (user: any) => user.email === email && user.password === password
    );
    if (!loggedInUser) {
      return {
        status: 'ERROR',
        message: 'Invalid Login credentails. Please try again after some time!',
      };
    }
    this.storeAuthData(loggedInUser.id, loggedInUser.email);
    return {
      status: 'SUCCESS',
      response: loggedInUser,
    };
  }

  async logout() {
    await Preferences.remove({ key: 'authData' });
    return {
      status: 'SUCCESS',
      message: 'Logged out successfully!',
    };
  }

  private storeAuthData(userId: string, email: string) {
    const data = JSON.stringify({
      userId: userId,
      email: email,
    });
    Preferences.set({ key: 'authData', value: data });
  }
}
