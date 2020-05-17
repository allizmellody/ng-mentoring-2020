import { ICourse } from './course.model';

export interface ICoursesResponse {
  data: ICourse[];
  count: number;
}
