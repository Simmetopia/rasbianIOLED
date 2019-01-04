import { LedArray } from "./LedArray";

const gpio = require("onoff").Gpio;

const Mode1 = new gpio(17,"in","both");

Mode1.watch((err:any,val:any)=>{
	if(err) console.log("there has been an error",err);
	if(val === 1) turnOn();
	else turnOff();
});

const OptionLeds = new LedArray([26, 19, 13]);

let flag = false;
let compareFlag = false;


const turnOn = () => {
    OptionLeds.GpioArray.forEach(led => {
      led.Gpio = flag === compareFlag ? 1 : 0;
      compareFlag = !compareFlag;
    });
};

const turnOff = () => {
  OptionLeds.GpioArray.forEach(led => {
      led.Gpio = flag === compareFlag ? 1 : 0;
      compareFlag = !compareFlag;
    });
};

const intervalInterrupt = setInterval(() => {
  if (flag) {
    turnOff();
  }
  if (!flag) {
    turnOn();
  }
  flag = !flag;
}, 250);

process.on("exit", () => {
  console.log("Shuts down gracefully");
  turnOff();
  clearInterval(intervalInterrupt);
});
process.on("SIGINT", () => {
  console.log("Shuts down gracefully");
  turnOff();
  clearInterval(intervalInterrupt);
});
process.on("uncaughtException", () => {
  console.log("Shuts down gracefully");
  turnOff();
  clearInterval(intervalInterrupt);
});
