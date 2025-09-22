import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto, FilmScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id')
  async getFilm(@Param('id') id: string): Promise<FilmDto> {
    const film = await this.filmsService.getFilmById(id);
    if (!film) throw new NotFoundException('Film not found');
    return film;
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string): Promise<FilmScheduleDto> {
    return this.filmsService.getFilmSchedule(id);
  }
}
