import { Body, Controller, Post } from '@nestjs/common';
import { RegisterNewCustomerUseCase } from './use-cases/register-new-customer.use-case';
import { CustomerInputDto } from './dtos/customer-input.dto';

@Controller('api/v1/customers')
export class CustomersController {
  constructor(
    private readonly registerNewCustomerUseCase: RegisterNewCustomerUseCase,
  ) {}

  @Post()
  async registerNewCustomer(@Body() customerInput: CustomerInputDto) {
    return await this.registerNewCustomerUseCase.execute(customerInput);
  }
}
