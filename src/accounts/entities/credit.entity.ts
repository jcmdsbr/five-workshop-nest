import { ITransaction } from '../contracts/transaction.contracts';
import { v4 } from 'uuid';

export class Credit implements ITransaction {
  public readonly amount: number;
  public readonly date: Date;
  public readonly id: string;
  public readonly description: string;

  private constructor(props: Required<Credit>) {
    Object.assign(this, props);
  }

  public static create(amount: number): Credit {
    const id = v4();
    return new Credit({
      id: id,
      amount: amount,
      date: new Date(),
      description: 'Credit',
    });
  }
}
