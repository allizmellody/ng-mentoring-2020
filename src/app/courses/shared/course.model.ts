export interface ICourse {
  id: string;
  title: string;
  creationDate: string;
  duration: string;
  description: string;
}

export class Course implements ICourse {
  public id: string;
  public title: string;
  public creationDate: string;
  public duration: string;
  public description: string;

  constructor(id: string, title: string, creationDate: string, duration: string, description: string) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
  }

}
