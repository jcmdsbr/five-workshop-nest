import { v4 } from 'uuid';

export class Customer {
  public readonly document: string;
  public readonly name: string;
  public readonly id: string;

  constructor(props: Omit<Customer, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id || v4();
  }
}
