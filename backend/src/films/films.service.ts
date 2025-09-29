import { Injectable } from '@nestjs/common';
import {
  FilmsListResponseDto,
  FilmResponseDto,
  ScheduleListResponseDto,
  ScheduleResponseDto,
} from './dto/films.dto';
import { FilmsRepository } from './repositories/films.repository';
import { ScheduleRepository } from './repositories/schedule.repository';

@Injectable()
export class FilmsService {
  constructor(
    private filmsRepository: FilmsRepository,
    private scheduleRepository: ScheduleRepository,
  ) {}

  async findAll(): Promise<FilmsListResponseDto> {
    const films = await this.filmsRepository.findAll();

    const items: FilmResponseDto[] = films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    }));

    return {
      total: films.length,
      items,
    };
  }

  async findScheduleByFilmId(filmId: string): Promise<ScheduleListResponseDto> {
    const schedules = await this.scheduleRepository.findByFilmId(filmId);

    const items: ScheduleResponseDto[] = schedules.map((schedule) => ({
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall.toString(),
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken ? schedule.taken.split(',') : [],
    }));

    return {
      total: schedules.length,
      items,
    };
  }
}
