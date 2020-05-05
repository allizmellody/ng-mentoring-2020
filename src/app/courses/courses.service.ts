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

  public createCourse() {}

  public getItemById(id: string) {}

  public updateItem() {}

  public removeItem(id: string): Promise<string> {
    return Promise.resolve(id);
  }
}
