import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../films/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
