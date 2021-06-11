import { Injectable } from '@nestjs/common';
import { IAccountRepository } from '../contracts/account-repository.contracts';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountRepository implements IAccountRepository {
  private readonly accounts: Map<string, Account> = new Map<string, Account>();

  async save(account: Account): Promise<void> {
    this.accounts.set(account.owner(), account);
  }
  async findByOwner(ownerId: string): Promise<Account> {
    return this.accounts.get(ownerId);
  }
}
