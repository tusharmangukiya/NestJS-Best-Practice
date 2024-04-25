import { Body, Controller, Put, Req, RequestMethod, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Messages } from 'message/messages';
import { ResponseUtility } from 'src/common/utility/response.utility';
import { Log } from '../common/utility/logger/log';

@Controller('api/v1')
export class CommonController {
  private readonly logger = Log.getLogger(CommonController.name);
  constructor() {}

  @Put('common/log/level')
  updateLogLevel(@Res() res: Response, @Req() req: Request, @Body() body: any) {
    this.logger.enter('updateLogLevel');
    this.logger.debug(`debug:: ${body.level}`);
    this.logger.error(`error:: ${body.level}`);
    this.logger.setLogLevel(body.level);
    //AppConfig.reload()
    //console.log(AppConfig.getInstance().propData)
    this.logger.printAllLog();
    console.log(this.logger);
    //LoggerConfig.loggerInstance = null;
    //LoggerConfig.getLogger('error');
    // Application.setLogLevel(body.level);
    this.logger.printAllLog();
    const response = ResponseUtility.getResponse(
      null,
      Messages.ADD_LOG_LEVEL,
      RequestMethod.PUT,
    );
    this.logger.exit('updateLogLevel');
    return res.json(response);
  }
}
