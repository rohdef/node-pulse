"use strict";

var pulse = require("../../src/index.js");

describe("When creating a sample specification it", () => {
  var sampleSpecificationBuilder;

  beforeEach(() => {
    sampleSpecificationBuilder = pulse.SampleSpecification.builder();
  });
  
  it("should have a format", () => {
    
    var spec = sampleSpecificationBuilder
          .withFormat(pulse.enums.sampleSpecificationFormats.signed16bitLittleEndian)
          .build();
    expect(spec.format).toBe(3);

    spec = sampleSpecificationBuilder
      .withFormat(pulse.enums.sampleSpecificationFormats.unsigned8bit)
      .build();
    expect(spec.format).toBe(0);
  });
  
  it("should have channels", () => {
    var spec = sampleSpecificationBuilder
          .withChannels(1)
          .build();
    expect(spec.channels).toBe(1);

    spec = sampleSpecificationBuilder
          .withChannels(7)
          .build();
    expect(spec.channels).toBe(7);
  });
  
  it("should have a rate", () => {
    var spec = sampleSpecificationBuilder
          .withRate(8000)
          .build();
    expect(spec.rate).toBe(8000);

    spec = sampleSpecificationBuilder
      .withRate(88200)
      .build();
    expect(spec.rate).toBe(88200);
  });

  it("should be able to do fluent on the builder", () => {
    var spec = sampleSpecificationBuilder
          .withFormat(pulse.enums.sampleSpecificationFormats.ulaw)
          .withChannels(5)
          .withRate(192000)
          .build();

    expect(spec.format).toBe(pulse.enums.sampleSpecificationFormats.ulaw);
    expect(spec.channels).toBe(5);
    expect(spec.rate).toBe(192000);
  });
});
