import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IAccountRepository } from '../contracts/account-repository.contracts';
import { BaseUseCase } from '../../common/use-cases/base.use-case';

@Injectable()
export class CloseAccountUseCase extends BaseUseCase {
  constructor(
    @Inject('IAccountRepository')
    private readonly repository: IAccountRepository,
  ) {
    super();
  }

  async execute(ownerId: string) {
    return await this.safeExecute(async () => {
      const account = await this.repository.findByOwner(ownerId);

      if (!account) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }

      account.canClose();
      await this.repository.save(account);
    });
  }
}
