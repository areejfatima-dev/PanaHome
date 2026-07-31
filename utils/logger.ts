type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp?: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';

function formatMessage({ level, message, data, timestamp }: LogOptions): string {
  const time = timestamp || new Date().toISOString();
  const dataStr = data ? ` ${JSON.stringify(data)}` : '';
  return `[${time}] ${level.toUpperCase()}: ${message}${dataStr}`;
}

export function logger(level: LogLevel, message: string, data?: any): void {
  if (!isDevelopment && level === 'debug') {
    return;
  }

  const formatted = formatMessage({ level, message, data });

  switch (level) {
    case 'debug':
      console.debug(formatted);
      break;
    case 'info':
      console.info(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    case 'error':
      console.error(formatted);
      break;
  }
}

export const log = {
  debug: (message: string, data?: any) => logger('debug', message, data),
  info: (message: string, data?: any) => logger('info', message, data),
  warn: (message: string, data?: any) => logger('warn', message, data),
  error: (message: string, data?: any) => logger('error', message, data),
};