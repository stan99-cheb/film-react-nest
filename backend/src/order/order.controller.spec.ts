import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const mockService = {
      createOrder: jest.fn().mockResolvedValue({ id: 1, name: 'Test Order' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should create an order', async () => {
    const dto = {
      tickets: [],
      name: 'Test Order',
      email: 'test@mail.com',
      phone: '1234567890',
    };
    expect(await controller.createOrder(dto)).toEqual({
      id: 1,
      name: 'Test Order',
    });
    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });
});
