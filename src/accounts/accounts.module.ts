import { Module, Logger } from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';
import { AccountsController } from './accounts.controller';
import { CloseAccountUseCase } from './use-cases/close-account.use-case';
import { DepositUseCase } from './use-cases/deposit.use-case';
import { WithdrawUseCase } from './use-cases/withdraw.use-case';
import { GetCurrentBalanceUseCase } from './use-cases/get-current-balance.use-case';
import { CustomerRegisteredEventHandler } from './events/customer-registered.event-handler';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from '../common/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Account',
        schema: AccountSchema,
        collection: 'Account',
      },
    ]),
  ],
  providers: [
    Logger,
    CustomerRegisteredEventHandler,
    CloseAccountUseCase,
    DepositUseCase,
    WithdrawUseCase,
    GetCurrentBalanceUseCase,
    { provide: 'IAccountRepository', useClass: AccountRepository },
  ],
  controllers: [AccountsController],
})
export class AccountsModule {}
