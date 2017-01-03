"use strict";

var pulse = require("../../src/pulse.js");

describe("When connecting to pulseaudio it", () => {
  var sampleSpecification;
  var pulseBuilder;

  beforeEach(() => {
    sampleSpecification = new pulse.SampleSpecification(
      pulse.enums.sampleSpecificationFormats.signed16bitLittleEndian,
      1,
      44100);

    pulseBuilder = pulse.SimplePulse.builder()
      .withSampleSpecification(sampleSpecification);
  });
  
  describe("has the stream directions available, it", () => {
    it("should have no direction", () => {
      expect(pulse.enums.streamDirections.noDirection).toBe(0);
    });

    it("should have playback", () => {
      expect(pulse.enums.streamDirections.playback).toBe(1);
    });

    it("should have record", () => {
      expect(pulse.enums.streamDirections.record).toBe(2);
    });

    it("should have upload", () => {
      expect(pulse.enums.streamDirections.upload).toBe(3);
    });
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple no direction connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.enums.streamDirections.noDirection,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple playback connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.enums.streamDirections.playback,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple record connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.enums.streamDirections.record,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple upload connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.enums.streamDirections.upload,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });

  it("pg2", () => {
    var pa = pulseBuilder.build();
    expect(pa.isNull()).toBe(false);
  });
  
  it("playground", (done) => {
    sampleSpecification = new pulse.SampleSpecification(
      pulse.enums.sampleSpecificationFormats.float32bitLittleEndian,
      1,
      44100);
    
    var pa = new pulse.SimplePulse("From test",
                                   pulse.enums.streamDirections.record,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    setTimeout(() => {
      pa.close();
      done();
    }, 2500);
  });
});
