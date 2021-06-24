import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICustomerRepository } from '../contracts/customer-repository.contract';
import Customer from '../entities/customer.entity';
import { CustomerInputDto } from '../dtos/customer-input.dto';
import { Account } from '../../accounts/entities/account.entity';
import { Credit } from '../../accounts/entities/credit.entity';

@Injectable()
export class RegisterNewCustomerUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
    private readonly logger: Logger,
  ) {}

  async execute(customerInput: CustomerInputDto) {
    let customer = { name: customerInput.name } as Customer;
    customer = await this.repository.save(customer);
    const account = Account.open(
      customer._id,
      Credit.create(customerInput.initialAmount),
    );
    await this.repository.attachAccount(account);
    this.logger.log(
      `customer registered !! ${customer._id}`,
      'RegisterNewCustomerUseCase',
    );
    return { id: customer.id };
  }
}
