import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { FilmDto, FilmScheduleDto } from './dto/films.dto';
import { Film, FilmDocument } from './schemas/film.schema';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getAllFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.filmModel.find().exec();
    return {
      total: films.length,
      items: films.map((film) => ({
        id: film._id.toString(),
        title: film.title,
        rating: film.rating,
        director: film.director,
        tags: film.tags,
        about: film.about,
        description: film.description,
        image: film.image,
        cover: film.cover,
      })),
    };
  }

  async getFilmSchedule(id: string): Promise<FilmScheduleDto> {
    const film = await this.filmModel.findById(id).exec();
    if (!film) {
      throw new Error('Фильм не найден');
    }
    return {
      total: film.schedule.length,
      items: film.schedule.map((item) => ({
        id: item.id,
        daytime: item.daytime,
        hall: item.hall,
        rows: item.rows,
        seats: item.seats,
        price: item.price,
        taken: item.taken,
      })),
    };
  }

  async getFilmById(id: string): Promise<FilmDto | null> {
    const film = await this.filmModel.findById(id).exec();
    if (!film) return null;
    return {
      id: film._id.toString(),
      title: film.title,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    };
  }
}
