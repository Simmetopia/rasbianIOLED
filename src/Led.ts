import {Gpio} from 'onoff';

export class Led {
  private _gpio: Gpio;
  constructor(led: Gpio) {
    this._gpio = led;
  }
  public get Gpio() {
    return this._gpio._valueFd === 0 ? 0 : 1;
  }
  public set Gpio(val: 0 | 1) {
    this._gpio.writeSync(val);
  }
  public freeResources() {
    this._gpio.writeSync(0);
    this._gpio.unexport();
  }
}
