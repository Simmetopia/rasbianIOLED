import {LedArray} from './LedArray';
import {SwitchControl} from './SwitchControl';

const OptionLeds = new LedArray([21, 20, 16]);
const Sw1 = new SwitchControl(17);

const handle = () => {
  let status1 = Sw1.State;
  console.log(status1);
  switch (status1) {
    case 1: {
      OptionLeds.GpioArray[0].Gpio = 1;
      break;
    }
    default: {
      OptionLeds.GpioArray.forEach(gp => {
        gp.Gpio = 0;
      });
    }
  }
};
console.log('now staring to listen');
Sw1.startWatching(handle);

const freeResources = () => {
  console.log('handle stuff here');
  OptionLeds.GpioArray.forEach((led)=>led.Gpio = 0);
};
process.on('SIGINT', () => {
  console.log('Shuts down gracefully');
  freeResources();
});

process.on('uncaughtException', () => {
  console.log('Shuts down gracefully');
  freeResources();
});
