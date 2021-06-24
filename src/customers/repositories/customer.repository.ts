import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../contracts/customer-repository.contract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Customer from '../entities/customer.entity';
import { Account } from '../../accounts/entities/account.entity';
import AccountDocument from 'src/common/schemas/account.schema';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectModel(Customer.name)
    private customerRepository: Model<Customer>,
    @InjectModel(Account.name)
    private accountRepository: Model<AccountDocument>,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    const createdCustomer = await this.customerRepository.create(customer);
    return createdCustomer;
  }
  async attachAccount(account: Account): Promise<void> {
    await this.accountRepository.create(account);
  }
}
