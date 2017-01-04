"use strict";

var pulse = require("../../src/pulse.js");

describe("When creating a sample specification it", () => {
  it("should have a format", () => {
    var spec = new pulse.SampleSpecification(pulse.enums.sampleSpecificationFormats.signed16bitLittleEndian,
                                             2,
                                             44100);
    expect(spec.format).toBe(3);

    spec = new pulse.SampleSpecification(pulse.enums.sampleSpecificationFormats.unsigned8bit,
                                         2,
                                         22000);
    expect(spec.format).toBe(0);
  });
  
  it("should have channels", () => {
    var spec = new pulse.SampleSpecification(pulse.enums.sampleSpecificationFormats.alaw,
                                             1,
                                             44100);
    expect(spec.channels).toBe(1);

    spec = new pulse.SampleSpecification(pulse.enums.sampleSpecificationFormats.ulaw,
                                         2,
                                         44100);
    expect(spec.channels).toBe(2);
  });
  
  it("should have a rate", () => {
    var spec = new pulse.SampleSpecification(pulse.enums.sampleSpecificationFormats.s16be,
                                             1,
                                             44100);
    expect(spec.rate).toBe(44100);

    spec = new pulse.SampleSpecification(pulse.enums.sampleSpecificationFormats.signed16bitLittleEndian,
                                         5,
                                         22000);
    expect(spec.rate).toBe(22000);
  });
});
