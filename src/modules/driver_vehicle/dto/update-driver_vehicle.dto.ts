import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverVehicleDto } from './create-driver_vehicle.dto';

export class UpdateDriverVehicleDto extends PartialType(CreateDriverVehicleDto) {}
