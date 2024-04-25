import { deprecated, property } from './decorator';

export class Property {
  @property('DB.HOST')
  public host = '';

  static hostName = '';
  constructor() {}

  @deprecated('DB.HOST')
  static getHost(hostname?: string) {
    this.hostName = hostname;
    console.log('inside deprecated static method - staticMember =', hostname);
  }
}
