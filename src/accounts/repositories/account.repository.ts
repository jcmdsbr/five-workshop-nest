import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAccountRepository } from '../contracts/account-repository.contracts';
import { InjectModel } from '@nestjs/mongoose';
import AccountDocument from '../schemas/account.schema';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectModel(Account.name)
    private repository: Model<AccountDocument>,
  ) {}

  async save(account: Account): Promise<void> {
    if (account._id) {
      await this.repository.replaceOne({ _id: account._id }, account);
    } else {
      const createdAccount = new this.repository(account);
      await createdAccount.save();
    }
  }
  async findByOwner(ownerId: string): Promise<Account> {
    const doc = await this.repository.findOne({ customerId: ownerId }).exec();
    if (doc) return new Account(doc.toObject<Account>());
    return null;
  }
}
