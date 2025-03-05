import { Module } from '@nestjs/common';
import { DriversModule } from './modules/drivers/drivers.module';
import { CustomersModule } from './modules/customers/customers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { FinancialOperationsModule } from './modules/financial_operations/financial_operations.module';
import { DriverVehicleModule } from './modules/driver_vehicle/driver_vehicle.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [],
    }),
    DriversModule,
    CustomersModule,
    VehiclesModule,
    OrdersModule,
    RatingsModule,
    PaymentsModule,
    FinancialOperationsModule,
    DriverVehicleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
