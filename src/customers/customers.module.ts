import { Logger, Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './repositories/customer.repository';
import { RegisterNewCustomerUseCase } from './use-cases/register-new-customer.use-case';

@Module({
  controllers: [CustomersController],
  providers: [
    Logger,
    RegisterNewCustomerUseCase,
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
  ],
})
export class CustomersModule {}
