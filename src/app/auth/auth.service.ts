import { Injectable } from '@angular/core';

import { IUser, User } from '../shared/user.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public localStorageService: LocalStorageService) {}

  public login(user): IUser {
    const userData = {
      id: user.email,
      firstName: user.email,
      lastName: user.email,
    };

    this.localStorageService.setItem('user', JSON.stringify(userData));

    console.log(`successfully logged in as ${user.email}`);

    return userData;
  }

  public logout(): void {
    this.localStorageService.removeItem('user');
    console.log('Log out');
  }

  public isAuthenticated(): boolean {
    return !!this.localStorageService.getItem('user');
  }

  public getUserInfo(): IUser | null {
    const user = JSON.parse(this.localStorageService.getItem('user'));

    return user ? new User(user) : null;
  }
}
