import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialOperationDto } from './create-financial_operation.dto';

export class UpdateFinancialOperationDto extends PartialType(CreateFinancialOperationDto) {}
