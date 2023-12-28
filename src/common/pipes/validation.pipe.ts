import { Injectable, ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

const ZERO_SIZE = 0;
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (value instanceof Object && this.isEmpty(value)) {
      return value;
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const entity = plainToClass(metatype, value);
    const errors = await validate(entity);
    if (errors.length > ZERO_SIZE) {
      throw new BadRequestException({ errors: this.formatErrors(errors) });
    }
    return entity;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private formatErrors(errors: any[]): any {
    const formatted: any = {};
    errors.forEach((err) => {
      for (const property in err.constraints) {
        formatted[err.property] = err.constraints[property];
        return;
      }
    });
    return formatted;
  }

  private isEmpty(value: any): boolean {
    return !Boolean(Object.keys(value).length > ZERO_SIZE);
  }
}