import { DomainError } from '../errors/domain.error';
import { HttpException, HttpStatus } from '@nestjs/common';
export abstract class BaseUseCase {
  async safeExecute(action: () => Promise<any>): Promise<any> {
    try {
      return await action();
    } catch (error: any) {
      const domainError = error as DomainError;
      if (domainError) {
        throw new HttpException(domainError.message, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
}
