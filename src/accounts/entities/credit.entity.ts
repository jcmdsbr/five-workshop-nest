import Transaction from './transaction.entity';

export class Credit extends Transaction {
  private constructor(props: Required<Credit>) {
    super({ ...props });
  }

  public static create(amount: number): Credit {
    return new Credit({
      amount: amount,
      date: new Date(),
      description: 'Credit',
    });
  }
}
