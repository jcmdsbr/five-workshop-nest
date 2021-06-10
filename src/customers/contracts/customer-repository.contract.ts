import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  save(customer: Customer): Promise<void>;
}
