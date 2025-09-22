import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class FilmSchedule {
  @Prop({ required: true })
  id: string; // uuid для расписания

  @Prop({ required: true })
  daytime: string;

  @Prop()
  hall: string;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop([String])
  taken: string[];
}

export const FilmScheduleSchema = SchemaFactory.createForClass(FilmSchedule);

@Schema()
export class Film {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop()
  director: string;

  @Prop([String])
  tags: string[];

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({ type: [FilmScheduleSchema], default: [] })
  schedule: FilmSchedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
