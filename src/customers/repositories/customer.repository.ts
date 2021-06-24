import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../contracts/customer-repository.contract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Customer from '../entities/customer.entity';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectModel(Customer.name)
    private repository: Model<Customer>,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    return await this.repository.create(customer);
  }
}
