import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { cpf } from 'cpf-cnpj-validator';
import { ICustomerRepository } from '../contracts/customer-repository.contract';
import { Customer } from '../entities/customer.entity';
import { CustomerInputDto } from '../dtos/customer-input.dto';

@Injectable()
export class RegisterNewCustomerUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: Logger,
  ) {}

  async execute(customerInput: CustomerInputDto) {
    if (!cpf.isValid(customerInput.document)) {
      throw new HttpException(
        'Customer document is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const customer = new Customer(customerInput);
    await this.repository.save(customer);
    await this.eventEmitter.emitAsync('customer.registered', customer);
    this.logger.log('customer registered !!', 'RegisterNewCustomerUseCase');
    return { id: customer.id };
  }
}
