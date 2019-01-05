import {Gpio} from 'onoff';

const GPIO = require('onoff').Gpio;
export class SwitchControl {
  private _flipFlotState = 0;
  private _gpioPin: Gpio;

  constructor(gpioPin: number) {
    this._gpioPin = new GPIO(gpioPin, 'in', 'rising', {debounceTimeout: 10});
  }
  public freeResources() {
    this._gpioPin.unwatch();
    this._gpioPin.unexport();
  }

  public startWatching = (cb: () => void) => {
    this._gpioPin.watch((err, value) => {
      console.log('event!!!');
      if (err) console.log(err);
      this._flipFlotState = this._flipFlotState === 0 ? 1 : 0;
      cb();
    });
  };

  public get State() {
    return this._flipFlotState;
  }
}
