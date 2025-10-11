import { DevLogger, JsonLogger } from './logger.service';
import { TskvLogger } from './tskv.logger';
import { ConsoleLogger } from '@nestjs/common';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('should format message as JSON', () => {
    const result = logger['formatMessage']('log', 'test', { foo: 'bar' });
    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: 'test',
        optionalParams: [{ foo: 'bar' }],
      }),
    );
  });

  it('should call console.log with formatted message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.log('hello', 123);
    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({ level: 'log', message: 'hello', optionalParams: [123] }),
    );
    spy.mockRestore();
  });
});

describe('TskvLogger', () => {
  let logger: TskvLogger;
  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should format message as TSKV', () => {
    const toTskv = (level: string, message: any, ...optionalParams: any[]) => {
      const base = [
        `level=${level}`,
        `message=${typeof message === 'string' ? message : JSON.stringify(message)}`,
        `timestamp=mocked-timestamp`,
      ];
      if (optionalParams && optionalParams.length) {
        base.push(`params=${JSON.stringify(optionalParams)}`);
      }
      return base.join('\t');
    };
    expect(
      toTskv('log', 'test', { foo: 'bar' }).startsWith(
        'level=log\tmessage=test\ttimestamp=',
      ),
    ).toBe(true);
  });

  it('should call console.log with TSKV formatted message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.log('hello', 123);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('DevLogger', () => {
  let logger: DevLogger;
  beforeEach(() => {
    logger = new DevLogger();
  });

  it('should call ConsoleLogger.log', () => {
    const spy = jest
      .spyOn(ConsoleLogger.prototype, 'log')
      .mockImplementation(() => {});
    logger.log('test');
    expect(spy).toHaveBeenCalledWith('test');
    spy.mockRestore();
  });
});
