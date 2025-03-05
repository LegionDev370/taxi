import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinancialOperationsService } from './financial_operations.service';
import { CreateFinancialOperationDto } from './dto/create-financial_operation.dto';
import { UpdateFinancialOperationDto } from './dto/update-financial_operation.dto';

@Controller('financial-operations')
export class FinancialOperationsController {
  constructor(private readonly financialOperationsService: FinancialOperationsService) {}

  @Post()
  create(@Body() createFinancialOperationDto: CreateFinancialOperationDto) {
    return this.financialOperationsService.create(createFinancialOperationDto);
  }

  @Get()
  findAll() {
    return this.financialOperationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialOperationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinancialOperationDto: UpdateFinancialOperationDto) {
    return this.financialOperationsService.update(+id, updateFinancialOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialOperationsService.remove(+id);
  }
}
