export class DefaultConfig {
  public static readonly LOG_LEVEL = 'debug';
  public static loadDefault() {
    const defaultLogConfiguration = {
      logger: {
        console: {
          format: 'YYYY-MM-DD HH:mm:ss',
          colorize: {
            all: true,
            colors: {
              info: 'yellow',
              debug: 'green',
              error: 'bold red',
              warn: 'bold inverse red',
              verbose: 'cyan',
            },
          },
        },
        logfile: {
          dirname: 'logs',
          filename: 'amplify',
          extension: '.log',
          zippedArchive: true,
          maxSize: '20m',
        },
      },
    };

    return defaultLogConfiguration;
  }
}
