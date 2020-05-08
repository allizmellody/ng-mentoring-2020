import { Injectable } from '@angular/core';

import { ICourse } from './shared/course.model';
import data from './data.json';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  public getList(): Promise<ICourse[]> {
    return Promise.resolve(data);
  }

  public createCourse(): void {}

  public getItemById(id: string): void {}

  public updateItem(): void {}

  public removeItem(id: string): Promise<string> {
    return Promise.resolve(id);
  }
}
