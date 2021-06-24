import { Account } from '../entities/account.entity';

export interface IAccountRepository {
  save(account: Account): Promise<void>;
  findByOwner(ownerId: string): Promise<Account>;
}
