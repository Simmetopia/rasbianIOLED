import {LedArray} from './LedArray';
import {SwitchControl} from './SwitchControl';

const OptionLeds = new LedArray([21, 20, 16]);

const Sw1 = new SwitchControl(17);
const Sw2 = new SwitchControl(19);
const handle = () => {
  let status1 = Sw1.State;
  let status2 = Sw2.State;
  console.log(status1);
  switch ([status1, status2]) {
    case [1, 0]: {
      OptionLeds.GpioArray[0].Gpio = 1;
      break;
    }
    case [0, 1]: {
      OptionLeds.GpioArray[0].Gpio = 1;
      OptionLeds.GpioArray[1].Gpio = 1;
      break;
    }
    case [1, 1]: {
      OptionLeds.GpioArray.forEach(led => (led.Gpio = 1));
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
Sw2.startWatching(handle);
const freeResources = () => {
  console.log('handle stuff here');
  OptionLeds.GpioArray.forEach(led => led.freeResources());
  Sw1.freeResources();
};
process.on('SIGINT', () => {
  console.log('Shuts down gracefully');
  freeResources();
});

process.on('uncaughtException', () => {
  console.log('Shuts down gracefully');
  freeResources();
});
