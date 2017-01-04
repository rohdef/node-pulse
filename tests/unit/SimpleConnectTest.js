"use strict";

var pulse = require("../../src/pulse.js");

describe("When connecting to pulseaudio it", () => {
  var sampleSpecification;
  var pulseBuilder;

  beforeEach(() => {
    sampleSpecification = new pulse.SampleSpecification(
      pulse.enums.sampleSpecificationFormats.signed16bitLittleEndian,
      2,
      44100);

    pulseBuilder = pulse.SimplePulse.builder()
      .withName("Node-Pulse")
      .withDescription("Testing")
      .withSampleSpecification(sampleSpecification)
      .withDirection(pulse.enums.streamDirections.playback);
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple no direction connection", () => {
    var pa = pulseBuilder
          .withDirection(pulse.enums.streamDirections.noDirection)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple playback connection", () => {
    var pa = pulseBuilder
          .withDirection(pulse.enums.streamDirections.playback)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple record connection", () => {
    var pa = pulseBuilder
          .withDirection(pulse.enums.streamDirections.record)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple upload connection", () => {
    var pa = pulseBuilder
          .withDirection(pulse.enums.streamDirections.upload)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("playground", (done) => {
    sampleSpecification = new pulse.SampleSpecification(
      pulse.enums.sampleSpecificationFormats.float32bitLittleEndian,
      1,
      44100);

    pulseBuilder = pulse.SimplePulse.builder()
      .withName("Node-Pulse")
      .withDescription("Testing")
      .withSampleSpecification(sampleSpecification)
      .withDirection(pulse.enums.streamDirections.record)
      //.withDevice("alsa_output.usb-Yamaha_Corporation_Steinberg_UR22-00.analog-stereo.monitor")
      .withMap();
    
    var pa = pulseBuilder.build();
    
    expect(pa.isNull()).toBe(false);

    setTimeout(() => {
      pa.close();
      done();
    }, 2500);
  });
});
