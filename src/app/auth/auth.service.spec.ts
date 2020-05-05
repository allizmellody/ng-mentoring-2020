import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from '../shared/user.model';

describe('AuthService', () => {
  const user = {
    id: 'test',
    firstName: 'test',
    lastName: 'test',
  };

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the user in localStorage', () => {
    expect(service.login({ email: 'test' })).toEqual(user);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
  });

  it('should remove stored user from localStorage', () => {
    localStorage.setItem('user', JSON.stringify(user));
    service.logout();

    expect(localStorage.getItem('user')).toBe(null);
  });

  it('should return true then there are stored user in localStorage', () => {
    localStorage.setItem('user', JSON.stringify(user));

    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false then there are no stored user in localStorage', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should return stored user from localStorage', () => {
    localStorage.setItem('user', JSON.stringify(user));

    expect(service.getUserInfo()).toEqual(new User(user));
  });

  it('should return null when user not exist in localStorage', () => {
    expect(service.getUserInfo()).toBe(null);
  });
});
