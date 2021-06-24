import Customer from '../entities/customer.entity';
import { Account } from '../../accounts/entities/account.entity';

export interface ICustomerRepository {
  save(customer: Customer): Promise<Customer>;
  attachAccount(account: Account): Promise<void>;
}
