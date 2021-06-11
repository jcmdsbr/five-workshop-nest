import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAccountRepository } from '../contracts/account-repository.contracts';
import { OnEvent } from '@nestjs/event-emitter';
import { Account } from '../entities/account.entity';
import { Credit } from '../entities/credit.entity';

@Injectable()
export class CustomerRegisteredEventHandler {
  constructor(
    @Inject('IAccountRepository')
    private readonly repository: IAccountRepository,
    private readonly logger: Logger,
  ) {}

  @OnEvent('customer.registered', { async: true })
  async handle(customer: { id: string }) {
    const account = Account.open(customer.id, Credit.create(0));
    await this.repository.save(account);
    this.logger.debug(
      `Successful account: ${customer.id} opening`,
      'CustomerRegisteredEventHandler',
    );
  }
}
