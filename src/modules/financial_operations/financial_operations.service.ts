import { Injectable } from '@nestjs/common';
import { CreateFinancialOperationDto } from './dto/create-financial_operation.dto';
import { UpdateFinancialOperationDto } from './dto/update-financial_operation.dto';

@Injectable()
export class FinancialOperationsService {
  create(createFinancialOperationDto: CreateFinancialOperationDto) {
    return 'This action adds a new financialOperation';
  }

  findAll() {
    return `This action returns all financialOperations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financialOperation`;
  }

  update(id: number, updateFinancialOperationDto: UpdateFinancialOperationDto) {
    return `This action updates a #${id} financialOperation`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialOperation`;
  }
}
