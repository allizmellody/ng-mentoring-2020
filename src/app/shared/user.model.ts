export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export class User implements IUser {
  public id: string;
  public firstName: string;
  public lastName: string;

  constructor({ id, name: { first, last } }) {
    this.id = id;
    this.firstName = first;
    this.lastName = last;
  }
}
