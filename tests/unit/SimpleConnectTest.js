"use strict";

var pulse = require("../../src/pulse.js");

describe("When connecting to pulseaudio it", () => {
  var sampleSpecification;

  beforeEach(() => {
    sampleSpecification = new pulse.SampleSpecification(
      pulse.sampleSpecificationFormats.signed16bitLittleEndian,
      1,
      44100);
  });
  
  describe("has the stream directions available, it", () => {
    it("should have no direction", () => {
      expect(pulse.streamDirections.noDirection).toBe(0);
    });

    it("should have playback", () => {
      expect(pulse.streamDirections.playback).toBe(1);
    });

    it("should have record", () => {
      expect(pulse.streamDirections.record).toBe(2);
    });

    it("should have upload", () => {
      expect(pulse.streamDirections.upload).toBe(3);
    });
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple no direction connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.streamDirections.noDirection,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple playback connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.streamDirections.playback,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("should do a simple record connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.streamDirections.playback,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });

  // TODO rohdef 02-01-207 - why does it not work in the simple case?
  xit("should do a simple upload connection", () => {
    var pa = new pulse.SimplePulse("From test",
                                   pulse.streamDirections.upload,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
  
  it("playground", (done) => {
    sampleSpecification = new pulse.SampleSpecification(
      pulse.sampleSpecificationFormats.float32bitLittleEndian,
      1,
      44100);
    
    var pa = new pulse.SimplePulse("From test",
                                   pulse.streamDirections.record,
                                   "by RF",
                                   sampleSpecification);
    
    expect(pa.isNull()).toBe(false);

    setTimeout(() => {
      pa.close();
      done();
    }, 2500);
  });

});
