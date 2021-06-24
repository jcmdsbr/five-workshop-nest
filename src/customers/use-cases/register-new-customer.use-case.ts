import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ICustomerRepository } from '../contracts/customer-repository.contract';
import Customer from '../entities/customer.entity';
import { CustomerInputDto } from '../dtos/customer-input.dto';
import { Account } from '../../accounts/entities/account.entity';
import { Credit } from '../../accounts/entities/credit.entity';
import { IAccountRepository } from 'src/accounts/contracts/account-repository.contracts';

@Injectable()
export class RegisterNewCustomerUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: Logger,
  ) {}

  async execute(customerInput: CustomerInputDto) {
    //TODO desabilitado para testes com JMTER
    // if (!cpf.isValid(customerInput.document)) {
    //   throw new HttpException(
    //     'Customer document is not valid',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    //TODO desabilitado para testes com JMTER
    // await this.eventEmitter.emitAsync('customer.registered', {
    //   _id: customer._id,
    //   initialAmount: customerInput.initialAmount,
    // });
    let customer = { name: customerInput.name } as Customer;
    customer = await this.repository.save(customer);
    const account = Account.open(
      customer._id,
      Credit.create(customerInput.initialAmount),
    );
    await this.accountRepository.save(account);
    this.logger.log(
      `customer registered !! ${customer._id}`,
      'RegisterNewCustomerUseCase',
    );
    return { id: customer.id };
  }
}
