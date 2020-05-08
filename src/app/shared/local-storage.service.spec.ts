import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  const testKey = 'key';
  const testValue = 'value';

  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

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

  it('should store value in localStorage', () => {
    service.setItem(testKey, testValue);

    expect(localStorage.getItem(testKey)).toBe(testValue);
  });

  it('should store falsy values (undefined) as strings in localStorage', () => {
    service.setItem(testKey, undefined);

    expect(localStorage.getItem(testKey)).toBe('undefined');
  });

  it('should store falsy values (null) as strings in localStorage', () => {
    service.setItem(testKey, null);

    expect(localStorage.getItem(testKey)).toBe('null');
  });

  it('should return null when value not stored in localStorage', () => {
    expect(service.getItem(testKey)).toBe(null);
  });

  it('should return value from localStorage', () => {
    service.setItem(testKey, testValue);

    expect(service.getItem(testKey)).toBe(testValue);
  });

  it('should remove stored value from localStorage', () => {
    service.setItem(testKey, testValue);

    service.removeItem(testKey);

    expect(localStorage.removeItem(testKey)).toBeUndefined();
  });

  it('should remove all stored keys from localStorage', () => {
    service.setItem(testKey, testValue);
    service.setItem('testKey', testValue);

    service.clear();

    expect(localStorage.getItem(testKey)).toBe(null);
    expect(localStorage.getItem('testKey')).toBe(null);
  });
});
