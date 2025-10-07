import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film, Schedule } from '../films/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Film])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
