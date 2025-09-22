import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { Order, OrderDocument } from './schemas/order.schema';
import * as crypto from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<any> {
    const { email, phone, tickets } = orderDto;
    if (!Array.isArray(tickets) || tickets.length === 0) {
      throw new BadRequestException('Tickets must be a non-empty array');
    }

    const filmMap = new Map<
      string,
      { session: string; row: number; seat: number }[]
    >();
    for (const ticket of tickets) {
      if (
        !ticket.film ||
        !ticket.session ||
        ticket.row == null ||
        ticket.seat == null
      ) {
        throw new BadRequestException(
          'Each ticket must have film, session, row, seat',
        );
      }
      const key = ticket.film;
      if (!filmMap.has(key)) filmMap.set(key, []);
      filmMap
        .get(key)!
        .push({ session: ticket.session, row: ticket.row, seat: ticket.seat });
    }

    for (const [filmId, seatArr] of filmMap.entries()) {
      const film = await this.filmModel.findById(filmId).exec();
      if (!film) throw new NotFoundException('Film not found');
      for (const { session, row, seat } of seatArr) {
        const sessionObj = film.schedule.find((s) => s.id === session);
        if (!sessionObj) throw new NotFoundException('Session not found');
        const seatKey = `${row}:${seat}`;
        if (sessionObj.taken.includes(seatKey)) {
          throw new BadRequestException(`Seat ${seatKey} already taken`);
        }
        sessionObj.taken.push(seatKey);
      }
      await film.save();
    }

    const items = tickets.map((ticket) => ({
      ...ticket,
      id: crypto.randomUUID(),
    }));

    await this.orderModel.create({
      email,
      phone,
      tickets: items,
    });

    return {
      total: items.length,
      items,
    };
  }
}
