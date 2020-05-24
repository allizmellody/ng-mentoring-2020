export interface IAuthor {
  id: string;
  name: string;
}

export class Author implements IAuthor {
  public id: string;
  public name: string;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}
