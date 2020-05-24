import { IAuthor } from './author.model';

export interface ICourse {
  id: string;
  title: string;
  creationDate: any;
  duration: number;
  description: string;
  topRated?: boolean;
  authors: IAuthor[];
}

export class Course implements ICourse {
  public id: string;
  public title: string;
  public creationDate: string;
  public duration: number;
  public description: string;
  public topRated: boolean;
  public authors: IAuthor[];

  constructor({
    id,
    title,
    creationDate,
    duration,
    description,
    topRated,
    authors,
  }) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
    this.topRated = topRated;
    this.authors = authors;
  }
}
