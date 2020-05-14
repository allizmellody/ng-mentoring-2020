import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICourse } from './shared/course.model';
import { IChangeDetector } from '../shared/change-detector.model';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService implements IChangeDetector {
  private url = 'courses';
  private changed: boolean;

  constructor(private apiService: ApiService) {}

  public get checkChanges(): any {
    return this.changed;
  }

  public set checkChanges(value: any) {
    this.changed = value;
  }

  public getList(): Observable<ICourse[]> {
    return this.apiService.get<ICourse[]>(this.url);
  }

  public searchByWord(word: string): Observable<ICourse[]> {
    return this.apiService.findByWord(this.url, word);
  }

  public createCourse(data: ICourse): Observable<ICourse> {
    return this.apiService.post<ICourse>(this.url, data);
  }

  public getItemById(id: string): Observable<ICourse> {
    return this.apiService.get<ICourse>(`${this.url}/${id}`);
  }

  public updateCourse(id: string, data: ICourse): Observable<ICourse> {
    return this.apiService.put<ICourse>(`${this.url}/${id}`, data);
  }

  public removeCourse(id: string): Observable<string> {
    return this.apiService.delete(this.url, id);
  }
}
