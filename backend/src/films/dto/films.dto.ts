export class FilmDto {
  id: string;
  title: string;
  rating: number;
  director: string;
  tags: string[];
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class FilmScheduleItemDto {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmScheduleDto {
  total: number;
  items: FilmScheduleItemDto[];
}
