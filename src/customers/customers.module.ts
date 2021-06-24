import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './repositories/customer.repository';
import { RegisterNewCustomerUseCase } from './use-cases/register-new-customer.use-case';
import { CustomerSchema } from './entities/customer.entity';
import { AccountSchema } from 'src/common/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
        collection: 'Customer',
      },
      {
        name: 'Account',
        schema: AccountSchema,
        collection: 'Account',
      },
    ]),
  ],
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
