export class FilmResponseDto {
  id: string;
  rating: number;
  director: string;
  tags: string;
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class FilmsListResponseDto {
  total: number;
  items: FilmResponseDto[];
}

export class ScheduleResponseDto {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class ScheduleListResponseDto {
  total: number;
  items: ScheduleResponseDto[];
}
