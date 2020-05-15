import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from '../shared/user.model';
import { LocalStorageService } from '../shared/local-storage.service';

describe('AuthService', () => {
  const user = {
    id: 'test',
    name: {
      first: 'test',
      last: 'test',
    },
  };
  const userString = JSON.stringify(user);
  const lsTestKey = 'user';
  const lsSpy = jasmine.createSpyObj('LocalStorageService', [
    'getItem',
    'setItem',
    'removeItem',
  ]);

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useValue: lsSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call ls setItem with correct user', () => {
    expect(service.login({ email: 'test' })).toEqual(user);
    expect(lsSpy.setItem).toHaveBeenCalledWith(lsTestKey, userString);
  });

  it('should call ls removeItem', () => {
    service.logout();

    expect(lsSpy.removeItem).toHaveBeenCalledWith(lsTestKey);
  });

  it('should return true', () => {
    lsSpy.getItem.and.returnValue('existing user');

    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false', () => {
    lsSpy.getItem.and.returnValue(null);

    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should return stored user from localStorage', () => {
    lsSpy.getItem.and.returnValue(userString);

    expect(service.getUser()).toEqual(new User(user));
  });

  it('should return null when user not exist in localStorage', () => {
    lsSpy.getItem.and.returnValue(null);

    expect(service.getUser()).toBe(null);
  });
});
