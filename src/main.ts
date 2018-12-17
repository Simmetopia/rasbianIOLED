import { LedArray } from "./LedArray";
import { on } from "cluster";

const gpio = require("onoff").Gpio;

const Reds = new LedArray([26, 19, 13]);
const Greens = new LedArray([5, 6, 12]);
const Yellows = new LedArray([16, 20, 21]);

let flag = false;
let compareFlag = false;

const turnOn = () => {
  [Reds, Greens, Yellows].forEach(ledArray => {
    ledArray.GpioArray.forEach(led => {
      led.Gpio = flag === compareFlag ? 1 : 0;
      compareFlag = !compareFlag;
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
process.on("exit", turnOff);

setInterval(() => {
  if (flag) {
    turnOff();
  }
  if (!flag) {
    turnOn();
  }
  flag = !flag;
}, 250);
