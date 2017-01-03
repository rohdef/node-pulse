"use strict";

var sampleSpecificationFormats = {
  unsigned8bit: 0,
  alaw: 1,
  mulaw: 2,
  signed16bitLittleEndian: 3,
  signed16bitBigEndian: 4,
  float32bitLittleEndian: 5,
  float32bitBigEndian: 6,
  signed32bitLittleEndian: 7,
  signed32bitBigEndian: 8,
  signed24bitLittleEndian: 9,
  signed24bitBigEndian: 10,
  signed24bitAs32bitLittleEndian: 11,
  signed24bitAs32bitBigEndian: 12,
  max: 13,
  invalid: 14
};

var streamDirections = {
  noDirection: 0,
  playback: 1,
  record: 2,
  upload: 3
};

exports.streamDirections = streamDirections;
exports.sampleSpecificationFormats = sampleSpecificationFormats;
