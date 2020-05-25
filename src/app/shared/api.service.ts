import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://ng-server.herokuapp.com';

  constructor(private http: HttpClient) {}

  private getFullUrl(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.getFullUrl(url));
  }

  getPage<T>(url: string, page): Observable<T> {
    return this.get<T>(`${url}?page=${page}&limit=10`);
  }

  searchPage<T>(url: string, word: string, page: number): Observable<T> {
    return this.get(`${url}?page=${page}&limit=10&word=${word}`);
  }

  put<T>(url: string, item: any): Observable<T> {
    return this.http.put<T>(this.getFullUrl(url), item);
  }

  post<T>(url: string, body?: T): Observable<T> {
    return this.http.post<T>(this.getFullUrl(url), body);
  }

  delete(url: string, id: string): Observable<any> {
    return this.http.delete(`${this.getFullUrl(url)}/${id}`);
  }
}
