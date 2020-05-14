import { Injectable } from '@angular/core';

import { ICourse } from './shared/course.model';
import { IChangeDetector } from '../shared/change-detector.model';
import data from './data.json';

@Injectable({
  providedIn: 'root',
})
export class CoursesService implements IChangeDetector {
  private changed: any;

  constructor() {}

  public get checkChanges(): any {
    return this.changed;
  }

  public set checkChanges(value: any) {
    this.changed = value;
  }

  public getList(): Promise<ICourse[]> {
    return Promise.resolve(data);
  }

  public createCourse(item: ICourse): Promise<ICourse> {
    console.log(`Create item with title: ${item.title}`);

    return Promise.resolve(item);
  }

  public getItemById(id: string): Promise<ICourse> {
    const res = data.find((course: ICourse): boolean => course.id === id);

    if (res) {
      return Promise.resolve(res);
    }

    return Promise.reject();
  }

  public updateItem(item: ICourse): Promise<ICourse> {
    console.log(`Update item with id: ${item.id}`);

    return Promise.resolve(item);
  }

  public removeItem(id: string): Promise<string> {
    return Promise.resolve(id);
  }
}
