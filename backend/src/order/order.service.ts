import { Injectable } from '@nestjs/common';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderItemResponseDto,
} from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const items: OrderItemResponseDto[] = createOrderDto.tickets.map(
      (ticket) => ({
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        id: uuidv4(),
      }),
    );

    return {
      total: items.length,
      items,
    };
  }
}
