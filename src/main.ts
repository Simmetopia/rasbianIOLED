import { LedArray } from "./LedArray";

const gpio = require("onoff").Gpio;

const Reds = new LedArray([26, 19, 13]);
const Greens = new LedArray([5, 6, 12]);
const Yellows = new LedArray([16, 20, 21]);

[Reds, Greens, Yellows].forEach(ledArray => {
  ledArray.GpioArray.forEach(led => {
    led.Gpio = 1;
  });
});
