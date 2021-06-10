import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../contracts/customer-repository.contract';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  private readonly customers: Customer[] = [];
  async save(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
}
