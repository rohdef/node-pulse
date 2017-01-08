"use strict";

const pulse = require("./src/index.js");

const enums = pulse.enums;

var sampleSpecification = new pulse.SampleSpecification(
  enums.sampleSpecificationFormats.float32bitLittleEndian,
  1,
  44100);

var pulseBuilder = pulse.SimplePulse.builder()
      .withName("Node-Pulse")
      .withDescription("Testing")
      .withSampleSpecification(sampleSpecification)
      .withDirection(enums.streamDirections.record)
      .withDevice("alsa_output.usb-Yamaha_Corporation_Steinberg_UR22-00.analog-stereo.monitor")
      .withMap();

var pa = pulseBuilder.build();

console.log(pa.latency);

//setTimeout(() => {
pa.close();
//}, 2500);
