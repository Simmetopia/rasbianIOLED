import { Led } from "./Led";
const GPIO = require("onoff").Gpio;

export class LedArray {
  private _gpioArray: Led[];
  constructor(gpioPorts: number[]) {
    this._gpioArray = gpioPorts.map(port => new Led(new GPIO(port, "out")));
  }
  public get GpioArray() {
    return this._gpioArray;
  }
}
