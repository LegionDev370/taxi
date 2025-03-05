import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverVehicleService } from './driver_vehicle.service';
import { CreateDriverVehicleDto } from './dto/create-driver_vehicle.dto';
import { UpdateDriverVehicleDto } from './dto/update-driver_vehicle.dto';

@Controller('driver-vehicle')
export class DriverVehicleController {
  constructor(private readonly driverVehicleService: DriverVehicleService) {}

  @Post()
  create(@Body() createDriverVehicleDto: CreateDriverVehicleDto) {
    return this.driverVehicleService.create(createDriverVehicleDto);
  }

  @Get()
  findAll() {
    return this.driverVehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverVehicleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverVehicleDto: UpdateDriverVehicleDto) {
    return this.driverVehicleService.update(+id, updateDriverVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverVehicleService.remove(+id);
  }
}
