"use strict";

var enums = require("../../src/enums.js");

describe("For the stream directions, it", () => {
  it("should have no direction", () => {
    expect(enums.streamDirections.noDirection).toBe(0);
  });

  it("should have playback", () => {
    expect(enums.streamDirections.playback).toBe(1);
  });

  it("should have record", () => {
    expect(enums.streamDirections.record).toBe(2);
  });

  it("should have upload", () => {
    expect(enums.streamDirections.upload).toBe(3);
  });
});


describe("For the sample formats, it", () => {
  it("should have unsigned 8 bit PCM", () => {
    expect(enums.sampleSpecificationFormats.unsigned8bit).toBe(0);
  });
  
  it("should have 8 bit a-Law", () => {
    expect(enums.sampleSpecificationFormats.alaw).toBe(1);
  });

  it("should have 8 bit mu-Law", () => {
    expect(enums.sampleSpecificationFormats.mulaw).toBe(2);
  });

  it("should have signed 16 bit PCM little endian", () => {
    expect(enums.sampleSpecificationFormats.signed16bitLittleEndian).toBe(3);
  });

  it("should have signed 16 bit PCM big endian", () => {
    expect(enums.sampleSpecificationFormats.signed16bitBigEndian).toBe(4);
  });
  
  it("should have float 32 bit IEEE little endian", () => {
    expect(enums.sampleSpecificationFormats.float32bitLittleEndian).toBe(5);
  });
  
  it("should have float 32 bit IEEE big endian", () => {
    expect(enums.sampleSpecificationFormats.float32bitBigEndian).toBe(6);
  });
  
  it("should have signed 32 bit PCM little endian", () => {
    expect(enums.sampleSpecificationFormats.signed32bitLittleEndian).toBe(7);
  });
  
  it("should have signed 32 bit PCM big endian", () => {
    expect(enums.sampleSpecificationFormats.signed32bitBigEndian).toBe(8);
  });
  
  it("should have signed 24 bit PCM little endian", () => {
    expect(enums.sampleSpecificationFormats.signed24bitLittleEndian).toBe(9);
  });
  
  it("should have signed 24 bit PCM big endian", () => {
    expect(enums.sampleSpecificationFormats.signed24bitBigEndian).toBe(10);
  });
  
  it("should have signed 24 bit PCM in LSB 32 bit words, little endian", () => {
    expect(enums.sampleSpecificationFormats.signed24bitAs32bitLittleEndian).toBe(11);
  });
  
  it("should have signed 24 bit PCM in LSB 32 bit words, big endian", () => {
    expect(enums.sampleSpecificationFormats.signed24bitAs32bitBigEndian).toBe(12);
  });
  
  it("should have max (Upper limit of valid sample types)", () => {
    expect(enums.sampleSpecificationFormats.max).toBe(13);
  });
  
  it("should have invalid sample type", () => {
    expect(enums.sampleSpecificationFormats.invalid).toBe(14);
  });
});
