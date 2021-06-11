import { ITransaction } from '../contracts/transaction.contracts';
import { Credit } from './credit.entity';
import { Debit } from './debit.entity';
import { DomainError } from '../../common/errors/domain.error';
export class Account {
  private readonly transactions: ITransaction[];
  private customerId: string;
  private isActive: boolean;

  private constructor() {
    this.transactions = [];
  }

  public static open(customerId: string, credit: Credit): Account {
    const account = new Account();
    account.customerId = customerId;
    account.transactions.push(credit);
    account.isActive = true;
    return account;
  }

  public deposit(credit: Credit) {
    if (credit.amount <= 0) {
      throw new DomainError("The account credit doesn't satisfy");
    }
    this.transactions.push(credit);
  }

  public withdraw(debit: Debit) {
    if (this.currentBalance() < debit.amount) {
      throw new DomainError(
        `The account doesn't have enough funds to withdraw: ${debit.amount}`,
      );
    }
    this.transactions.push(debit);
  }

  public currentBalance() {
    const loadTransactions = this.transactions.map((transaction) => {
      return transaction.description === 'Debit'
        ? transaction.amount * -1
        : transaction.amount;
    });
    return loadTransactions.reduce((balance, amount) => balance + amount);
  }

  public canClose() {
    if (this.currentBalance() > 0) {
      throw new DomainError("The account can't be closed because it has funds");
    }
    this.isActive = false;
  }

  public owner = () => this.customerId;
}
