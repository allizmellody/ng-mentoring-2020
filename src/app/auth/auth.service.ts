import { Injectable } from '@angular/core';

import { IUser, User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public login(user): IUser {
    const userData = {
      id: user.email,
      firstName: user.email,
      lastName: user.email,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    console.log(`successfully logged in as ${user.email}`);

    return userData;
  }

  public logout() {
    localStorage.removeItem('user');
    console.log('Log out');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  public getUserInfo(): IUser | null {
    const user = JSON.parse(localStorage.getItem('user'));

    return user ? new User(user) : null;
  }
}
