import {Gpio} from 'onoff';

const GPIO = require('onoff').Gpio;
export class SwitchControl {
  private _flipFlopState = 0;
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
      if (err) console.log(err);
      this._flipFlopState = this._flipFlopState === 0 ? 1 : 0;
      cb();
    });
  };

  public get State() {
    return this._flipFlopState;
  }
}
