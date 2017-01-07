"use strict";

var PulseLibMock = require("./PulseLibMock.js");
var enums = require("../../src/enums.js");
var SampleSpecification = require("../../src/SampleSpecification.js");
var SimplePulseRaw = require("../../src/SimplePulse.js");

describe("When connecting to pulseaudio it", () => {
  var SimplePulse;
  var PulseLib;
  var sampleSpecification;
  var pulseBuilder;

  beforeEach(() => {
    PulseLib = PulseLibMock();
    SimplePulse = SimplePulseRaw({
      pulseLib: PulseLib
    });
    
    sampleSpecification = new SampleSpecification(
      enums.sampleSpecificationFormats.signed16bitLittleEndian,
      2,
      44100);

    pulseBuilder = SimplePulse.builder()
      .withName("Node-Pulse")
      .withDescription("Testing")
      .withSampleSpecification(sampleSpecification)
      .withDirection(enums.streamDirections.playback);
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple no direction connection", () => {
    var pa = pulseBuilder
          .withDirection(enums.streamDirections.noDirection)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple playback connection", () => {
    var pa = pulseBuilder
          .withDirection(enums.streamDirections.playback)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple record connection", () => {
    var pa = pulseBuilder
          .withDirection(enums.streamDirections.record)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple upload connection", () => {
    var pa = pulseBuilder
          .withDirection(enums.streamDirections.upload)
          .build();
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("playground", (done) => {
    sampleSpecification = new SampleSpecification(
      enums.sampleSpecificationFormats.float32bitLittleEndian,
      1,
      44100);

    pulseBuilder = SimplePulse.builder()
      .withName("Node-Pulse")
      .withDescription("Testing")
      .withSampleSpecification(sampleSpecification)
      .withDirection(enums.streamDirections.record)
      //.withDevice("alsa_output.usb-Yamaha_Corporation_Steinberg_UR22-00.analog-stereo.monitor")
      .withMap();
    
    var pa = pulseBuilder.build();
    
    expect(pa.isNull()).toBe(false);

    // console.log(pa.latency);

    setTimeout(() => {
      pa.close();
      done();
    }, 500);
  });
});
