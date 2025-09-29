import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, Schedule } from './entities';
import { FilmsRepository } from './repositories/films.repository';
import { ScheduleRepository } from './repositories/schedule.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [FilmsService, FilmsRepository, ScheduleRepository],
  controllers: [FilmsController],
  exports: [TypeOrmModule],
})
export class FilmsModule {}
