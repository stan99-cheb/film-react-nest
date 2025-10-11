import { Injectable, LoggerService } from '@nestjs/common';

function toTskv(level: string, message: any, ...optionalParams: any[]) {
  // TSKV: key=value\tkey2=value2\t...
  const base = [
    `level=${level}`,
    `message=${typeof message === 'string' ? message : JSON.stringify(message)}`,
    `timestamp=${new Date().toISOString()}`,
  ];
  if (optionalParams && optionalParams.length) {
    base.push(`params=${JSON.stringify(optionalParams)}`);
  }
  return base.join('\t');
}

@Injectable()
export class TskvLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(toTskv('log', message, ...optionalParams));
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(toTskv('error', message, ...optionalParams));
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(toTskv('warn', message, ...optionalParams));
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.debug(toTskv('debug', message, ...optionalParams));
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.info(toTskv('verbose', message, ...optionalParams));
  }
}
