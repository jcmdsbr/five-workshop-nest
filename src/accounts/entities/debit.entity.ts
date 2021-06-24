import Transaction from './transaction.entity';

export class Debit extends Transaction {
  private constructor(props: Required<Debit>) {
    super({ ...props });
  }

  public static create(amount: number): Debit {
    return new Debit({
      amount: amount,
      date: new Date(),
      description: 'Debit',
    });
  }
}
