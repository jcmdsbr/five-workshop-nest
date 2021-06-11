import { ITransaction } from '../contracts/transaction.contracts';
import { v4 } from 'uuid';

export class Debit implements ITransaction {
  public readonly amount: number;
  public readonly date: Date;
  public readonly id: string;
  public readonly description: string;

  private constructor(props: Required<Debit>) {
    Object.assign(this, props);
  }

  public static create(amount: number): Debit {
    const id = v4();
    return new Debit({
      id: id,
      amount: amount,
      date: new Date(),
      description: 'Debit',
    });
  }
}
