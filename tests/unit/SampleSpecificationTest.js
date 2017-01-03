"use strict";

var pulse = require("../../src/pulse.js");

describe("When creating a sample specification it", () => {
  describe("has the sample formats", () => {
    it("should have unsigned 8 bit PCM", () => {
      expect(pulse.enums.sampleSpecificationFormats.unsigned8bit).toBe(0);
    });
    
    it("should have 8 bit a-Law", () => {
      expect(pulse.enums.sampleSpecificationFormats.alaw).toBe(1);
    });

    it("should have 8 bit mu-Law", () => {
      expect(pulse.enums.sampleSpecificationFormats.mulaw).toBe(2);
    });

    it("should have signed 16 bit PCM little endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed16bitLittleEndian).toBe(3);
    });

    it("should have signed 16 bit PCM big endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed16bitBigEndian).toBe(4);
    });
    
    it("should have float 32 bit IEEE little endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.float32bitLittleEndian).toBe(5);
    });
    
    it("should have float 32 bit IEEE big endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.float32bitBigEndian).toBe(6);
    });
    
    it("should have signed 32 bit PCM little endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed32bitLittleEndian).toBe(7);
    });
    
    it("should have signed 32 bit PCM big endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed32bitBigEndian).toBe(8);
    });
    
    it("should have signed 24 bit PCM little endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed24bitLittleEndian).toBe(9);
    });
    
    it("should have signed 24 bit PCM big endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed24bitBigEndian).toBe(10);
    });
    
    it("should have signed 24 bit PCM in LSB 32 bit words, little endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed24bitAs32bitLittleEndian).toBe(11);
    });
    
    it("should have signed 24 bit PCM in LSB 32 bit words, big endian", () => {
      expect(pulse.enums.sampleSpecificationFormats.signed24bitAs32bitBigEndian).toBe(12);
    });
    
    it("should have max (Upper limit of valid sample types)", () => {
      expect(pulse.enums.sampleSpecificationFormats.max).toBe(13);
    });
    
    it("should have invalid sample type", () => {
      expect(pulse.enums.sampleSpecificationFormats.invalid).toBe(14);
    });
  });
  
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
