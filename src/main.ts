import { NestFactory } from '@nestjs/core';
import { AppConfig } from 'resources/app.config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { Application } from './application';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    logger: Application.applyCustomLogger(),
    //bodyParser: true,
    // bufferLogs: true,
    abortOnError: true, // for transactional
  });

  /**
   * This property set application instance as static
   * we can use it any were
   */
  Application.setApp(app);

  const PORT = AppConfig.get('SERVER.PORT');
  console.warn(`Application running prot:: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
