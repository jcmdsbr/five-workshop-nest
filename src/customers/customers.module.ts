import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './repositories/customer.repository';
import { RegisterNewCustomerUseCase } from './use-cases/register-new-customer.use-case';
import { CustomerSchema } from './entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
        collection: 'Customer',
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
