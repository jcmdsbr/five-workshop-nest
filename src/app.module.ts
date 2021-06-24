import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { AccountsModule } from './accounts/accounts.module';
import { CommonModule } from './common/common.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    CustomersModule,
    AccountsModule,
    CommonModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://dev:ykV6BLD902ugG8Zi@poc-jmter.wjaii.mongodb.net/SampleMongoDb2?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
