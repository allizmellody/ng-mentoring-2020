export interface ICourse {
  id: string;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
  topRated: boolean;
}

export class Course implements ICourse {
  public id: string;
  public title: string;
  public creationDate: string;
  public duration: number;
  public description: string;
  public topRated: boolean;

  constructor({ id, title, creationDate, duration, description, topRated }) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
    this.topRated = topRated;
  }
}
