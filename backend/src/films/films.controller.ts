import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsListResponseDto, ScheduleListResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<FilmsListResponseDto> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findScheduleByFilmId(
    @Param('id') filmId: string,
  ): Promise<ScheduleListResponseDto> {
    return this.filmsService.findScheduleByFilmId(filmId);
  }
}
