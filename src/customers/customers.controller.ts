import { Body, Controller, Post } from '@nestjs/common';
import { RegisterNewCustomerUseCase } from './use-cases/register-new-customer.use-case';

@Controller('api/v1/customers')
export class CustomersController {
  constructor(
    private readonly registerNewCustomerUseCase: RegisterNewCustomerUseCase,
  ) {}

  @Post()
  async registerNewCustomer(
    @Body() customerInput: { name: string; document: string },
  ) {
    await this.registerNewCustomerUseCase.execute(customerInput);
  }
}
