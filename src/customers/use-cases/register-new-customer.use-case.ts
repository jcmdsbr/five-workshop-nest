import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../contracts/customer-repository.contract';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class RegisterNewCustomerUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
  ) {}

  async execute(customerInput: any) {
    const customer = new Customer(customerInput);
    await this.repository.save(customer);
  }
}
