export interface ICourse {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
}

export class Course implements ICourse {
  public id: string;
  public title: string;
  public creationDate: Date;
  public duration: number;
  public description: string;

  constructor(id: string, title: string, creationDate: Date, duration: number, description: string) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
  }

}
