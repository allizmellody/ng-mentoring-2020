import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { IAuthor } from './shared/author.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private apiService: ApiService) {}

  searchByWord(query: string): Observable<IAuthor[]> {
    return this.apiService.get<IAuthor[]>(`authors?q=${query}`);
  }
}
