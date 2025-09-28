import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import {
  FilmsListResponseDto,
  FilmResponseDto,
  ScheduleListResponseDto,
  ScheduleResponseDto,
} from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<FilmsListResponseDto> {
    const films = await this.filmsRepository.find();

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
    const schedules = await this.scheduleRepository.find({
      where: { filmId },
    });

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
