import { Module } from '@nestjs/common';
import { DriverVehicleService } from './driver_vehicle.service';
import { DriverVehicleController } from './driver_vehicle.controller';

@Module({
  controllers: [DriverVehicleController],
  providers: [DriverVehicleService],
})
export class DriverVehicleModule {}
