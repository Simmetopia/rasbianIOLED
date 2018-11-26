import { Gpio } from "onoff";

const gpio = require("onoff").Gpio;

(new gpio(5, "out") as Gpio).writeSync(1);
(new gpio(6, "out") as Gpio).writeSync(1);
(new gpio(13, "out") as Gpio).writeSync(1);
(new gpio(19, "out") as Gpio).writeSync(1);
(new gpio(26, "out") as Gpio).writeSync(1);
(new gpio(12, "out") as Gpio).writeSync(1);
(new gpio(20, "out") as Gpio).writeSync(1);
(new gpio(21, "out") as Gpio).writeSync(1);
