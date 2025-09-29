import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderItemResponseDto,
} from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';
import { Film, Schedule } from '../films/entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const items: OrderItemResponseDto[] = [];

    for (const ticket of createOrderDto.tickets) {
      const film = await this.filmRepository.findOneBy({ id: ticket.film });
      if (!film) {
        throw new NotFoundException(`Фильм с id ${ticket.film} не найден`);
      }

      const schedule = await this.scheduleRepository.findOneBy({
        id: ticket.session,
      });

      if (!schedule) {
        throw new NotFoundException(`Сеанс с id ${ticket.session} не найден`);
      }

      const newTakenSeat = `${ticket.row}:${ticket.seat}`;
      const takenSeats = schedule.taken ? schedule.taken.split(',') : [];
      if (takenSeats.includes(newTakenSeat)) {
        throw new ConflictException(
          `Место ряд:${ticket.row} место:${ticket.seat} уже занято`,
        );
      }
      takenSeats.push(newTakenSeat);
      schedule.taken = takenSeats.join(',');
      await this.scheduleRepository.save(schedule);

      items.push({
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        id: uuidv4(),
      });
    }

    return {
      total: items.length,
      items,
    };
  }
}
