import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from '../contracts/account-repository.contracts';
import { TransactionInputDto } from '../dtos/transaction-input.dto';
import { Debit } from '../entities/debit.entity';
import { BaseUseCase } from '../../common/use-cases/base.use-case';

@Injectable()
export class WithdrawUseCase extends BaseUseCase {
  constructor(
    @Inject('IAccountRepository')
    private readonly repository: IAccountRepository,
  ) {
    super();
  }

  async execute(ownerId: string, withdraw: TransactionInputDto) {
    return await this.safeExecute(async () => {
      const account = await this.repository.findByOwner(ownerId);

      if (!account) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }

      const debit = Debit.create(withdraw.amount);
      account.withdraw(debit);

      await this.repository.save(account);
    });
  }
}
