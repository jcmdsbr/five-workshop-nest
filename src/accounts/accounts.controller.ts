import { TransactionInputDto } from './dtos/transaction-input.dto';
import { CloseAccountUseCase } from './use-cases/close-account.use-case';
import { DepositUseCase } from './use-cases/deposit.use-case';
import { WithdrawUseCase } from './use-cases/withdraw.use-case';
import { GetCurrentBalanceUseCase } from './use-cases/get-current-balance.use-case';
import {
  Controller,
  Delete,
  Param,
  Post,
  HttpCode,
  Body,
  Get,
} from '@nestjs/common';

@Controller('api/v1/accounts')
export class AccountsController {
  constructor(
    private readonly closeAccountUseCase: CloseAccountUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly getCurrentBalanceUseCase: GetCurrentBalanceUseCase,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async closeAccount(@Param('id') id: string) {
    return await this.closeAccountUseCase.execute(id);
  }

  @Post(':id/deposit')
  @HttpCode(200)
  async deposit(@Param('id') id: string, @Body() deposit: TransactionInputDto) {
    return await this.depositUseCase.execute(id, deposit);
  }

  @Post(':id/withdraw')
  @HttpCode(200)
  async withdraw(
    @Param('id') id: string,
    @Body() withdraw: TransactionInputDto,
  ) {
    return await this.withdrawUseCase.execute(id, withdraw);
  }

  @Get(':id')
  async getCurrentBalance(@Param('id') id: string) {
    return await this.getCurrentBalanceUseCase.execute(id);
  }
}
