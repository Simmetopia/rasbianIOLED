import { LedArray } from "./LedArray";
import { on } from "cluster";

const gpio = require("onoff").Gpio;

const Reds = new LedArray([26, 19, 13]);
const Greens = new LedArray([5, 6, 12]);
const Yellows = new LedArray([16, 20, 21]);

let flag = false;

const turnOn = () => {
  [Reds, Greens, Yellows].forEach(ledArray => {
    ledArray.GpioArray.forEach(led => {
      led.Gpio = 1;
    });
  });
};

const turnOff = () => {
  [Reds, Greens, Yellows].forEach(ledArray => {
    ledArray.GpioArray.forEach(led => {
      led.Gpio = 0;
    });
  });
};

setInterval(() => {
  if (flag) {
    turnOff();
  }
  if (!flag) {
    turnOn();
  }
  flag = !flag;
}, 1000);
