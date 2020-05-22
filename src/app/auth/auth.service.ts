import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IUser, User } from '../shared/user.model';
import { LocalStorageService } from '../shared/local-storage.service';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<IUser | null> = new BehaviorSubject(null);

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService
  ) {}

  private setUserInfo(): Promise<void> {
    return this.apiService
      .post<any>('auth/userinfo')
      .toPromise()
      .then((val) => {
        this.user.next(new User(val));
      });
  }

  public getUserInfo(): Observable<IUser> {
    return this.user.asObservable();
  }

  public login(body): Promise<void> {
    return this.apiService
      .post('auth/login', body)
      .toPromise()
      .then(({ token }) => {
        this.localStorageService.setItem('token', token);

        return this.setUserInfo();
      });
  }

  public auth(): Promise<void> {
    if (this.getToken()) {
      return this.setUserInfo();
    }

    return Promise.resolve();
  }

  public logout(): Promise<void> {
    this.localStorageService.removeItem('token');
    this.user.next(null);

    return Promise.resolve();
  }

  public isAuthenticated(): boolean {
    return Boolean(this.user.getValue());
  }

  public getToken(): string {
    return this.localStorageService.getItem('token') || '';
  }
}
