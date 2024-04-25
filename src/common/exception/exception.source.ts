export class ExceptionSource {
  private readonly _name: string;
  private readonly _methodName: string;
  private readonly _SEPARATOR: string = '.';
  //public isPrintStack:boolean =false;
  constructor(name: string, methodName?: string) {
    this._name = name;
    this._methodName = methodName;
  }
  public getName(): string {
    return this._name;
  }
  public getMethodName(): string {
    return this._methodName;
  }

  public getSource() {
    return `${this._name}${this._SEPARATOR}${this._methodName}`;
  }
}
