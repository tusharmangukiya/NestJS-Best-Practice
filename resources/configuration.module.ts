import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //load: [AppConfig.loadData] ,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
})
export class ConfigurationModule {
  constructor() {
    // configService.get('DB.HOST')
    // const appConf = new AppConf()
    //Application.setConf(configService);
  }
}
