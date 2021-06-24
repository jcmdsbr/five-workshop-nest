import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAccountRepository } from '../contracts/account-repository.contracts';
import { OnEvent } from '@nestjs/event-emitter';
import { Credit } from '../entities/credit.entity';
import { Account } from '../entities/account.entity';

@Injectable()
export class CustomerRegisteredEventHandler {
  constructor(
    @Inject('IAccountRepository')
    private readonly repository: IAccountRepository,
    private readonly logger: Logger,
  ) {}

  @OnEvent('customer.registered', { async: true })
  async handle(customer: any) {
    const account = Account.open(
      customer._id,
      Credit.create(customer.initialAmount),
    );
    await this.repository.save(account);
    this.logger.debug(
      `Successful account: ${customer._id} opening`,
      'CustomerRegisteredEventHandler',
    );
  }
}
