import { Module } from '@nestjs/common';
import { FinancialOperationsService } from './financial_operations.service';
import { FinancialOperationsController } from './financial_operations.controller';

@Module({
  controllers: [FinancialOperationsController],
  providers: [FinancialOperationsService],
})
export class FinancialOperationsModule {}
