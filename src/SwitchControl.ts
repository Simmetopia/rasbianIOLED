import {Gpio} from 'onoff';

let gpio = require('onoff').GPIO;
export class SwitchControl {
  private _flipFlotState = 0;
  private _gpioPin: Gpio;

  constructor(gpioPin: number) {
    this._gpioPin = new gpio(gpioPin, 'in', 'rising', {debounceTimeout: 10});
  }

  public startWatching = (cb: () => void) => {
    this._gpioPin.watch((err, value) => {
      console.log('event!!!');
      if (err) console.log(err);
      this._flipFlotState = value === 1 ? 1 : 0;
    });
  };

  public get State() {
    return this._flipFlotState;
  }
}
