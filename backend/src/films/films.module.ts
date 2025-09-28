import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, Schedule } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [FilmsService],
  controllers: [FilmsController],
  exports: [TypeOrmModule],
})
export class FilmsModule {}
