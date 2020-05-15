import { Injectable } from '@angular/core';

import { IUser, User } from '../shared/user.model';
import { LocalStorageService } from '../shared/local-storage.service';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: IUser | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService
  ) {}

  private setUserInfo(): Promise<void> {
    return this.apiService
      .post<any>('auth/userinfo')
      .toPromise()
      .then((val) => {
        this.user = new User(val);
      });
  }

  public get userInfo(): IUser | null {
    return this.user;
  }

  public login(body): Promise<any> {
    return this.apiService
      .post('auth/login', body)
      .toPromise()
      .then(({ token }) => {
        this.localStorageService.setItem('token', token);

        return this.setUserInfo();
      });
  }

  public auth(): any {
    if (this.getToken()) {
      return this.setUserInfo();
    }

    return Promise.resolve();
  }

  public logout(): Promise<void> {
    this.localStorageService.removeItem('token');
    this.user = null;

    return Promise.resolve();
  }

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public getToken(): string {
    return this.localStorageService.getItem('token') || '';
  }
}
