import { Injectable } from '@nestjs/common';
import { CreateDriverVehicleDto } from './dto/create-driver_vehicle.dto';
import { UpdateDriverVehicleDto } from './dto/update-driver_vehicle.dto';

@Injectable()
export class DriverVehicleService {
  create(createDriverVehicleDto: CreateDriverVehicleDto) {
    return 'This action adds a new driverVehicle';
  }

  findAll() {
    return `This action returns all driverVehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driverVehicle`;
  }

  update(id: number, updateDriverVehicleDto: UpdateDriverVehicleDto) {
    return `This action updates a #${id} driverVehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} driverVehicle`;
  }
}
