enum LogLevel {
  INFO,
  ERROR,
}

const levelLogFns = {
  [LogLevel.INFO]: console.log,
  [LogLevel.ERROR]: console.error,
};

export const logger = {
  log: (level: LogLevel.INFO | LogLevel.ERROR, message: string) => {
    const timestamp = new Date().toISOString();
    const levelString = LogLevel[level].toUpperCase();
    const levelLogFn = levelLogFns[level];
    levelLogFn(`[${timestamp}] [${levelString}] ${message}`);
  },
  error: function (error: string) {
    this.log(LogLevel.ERROR, error);
  },
  info: function (message: string) {
    this.log(LogLevel.INFO, message);
  },
};
