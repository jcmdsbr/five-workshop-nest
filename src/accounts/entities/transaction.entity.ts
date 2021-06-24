import { ITransaction } from '../contracts/transaction.contracts';

export default abstract class Transaction implements ITransaction {
  public readonly amount: number;
  public readonly date: Date;
  public readonly description: string;

  protected constructor(props: Required<Transaction>) {
    Object.assign(this, props);
  }
}
