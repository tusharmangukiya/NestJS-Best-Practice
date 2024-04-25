import { Module } from '@nestjs/common';
import { Log } from '../common/utility/logger/log';
import { CommonController } from 'src/controller/common.controller';

@Module({
  controllers: [CommonController],
  providers: [],
  //exports: [Log],
})
export class CommonModule {}
