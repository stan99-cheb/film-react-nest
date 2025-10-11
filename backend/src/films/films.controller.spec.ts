import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn().mockResolvedValue({
        total: 1,
        items: [{ id: 1, title: 'Test Film' }],
      }),
      findScheduleByFilmId: jest.fn().mockResolvedValue({
        total: 1,
        items: [{ id: 1, daytime: '12:00', hall: '1', rows: [] }],
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: mockService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should return all films', async () => {
    expect(await controller.findAll()).toEqual({
      total: 1,
      items: [{ id: 1, title: 'Test Film' }],
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return schedule by film id', async () => {
    expect(await controller.findScheduleByFilmId('1')).toEqual({
      total: 1,
      items: [{ id: 1, daytime: '12:00', hall: '1', rows: [] }],
    });
    expect(service.findScheduleByFilmId).toHaveBeenCalledWith('1');
  });
});
