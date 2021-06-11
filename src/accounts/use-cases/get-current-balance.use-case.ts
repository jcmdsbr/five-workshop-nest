import { Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from '../contracts/account-repository.contracts';
import { BaseUseCase } from '../../common/use-cases/base.use-case';

@Injectable()
export class GetCurrentBalanceUseCase extends BaseUseCase {
  constructor(
    @Inject('IAccountRepository')
    private readonly repository: IAccountRepository,
  ) {
    super();
  }

  async execute(ownerId: string) {
    return await this.safeExecute(async () => {
      const account = await this.repository.findByOwner(ownerId);
      return account?.currentBalance();
    });
  }
}
