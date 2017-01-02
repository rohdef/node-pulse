"use strict";

const ref = require("ref");
const ffi = require("ffi");
const refStruct = require("ref-struct");

var paSampleSpecT = refStruct({
  "format": ref.types.uint32,
  "rate": ref.types.uint32,
  "channels": ref.types.uint32
});
var paSampleSpecPtrT = ref.refType(paSampleSpecT);

var paSimple = ref.types.void;
var paSimplePtr = ref.refType(paSimple);

var errorT = ref.types.int;
var errorPtrT = ref.refType(errorT);

var string = ref.types.CString;
var voidPtrT = ref.refType(ref.types.void);

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

var pulse = ffi.Library("libpulse-simple", {
  "pa_simple_new": [paSimplePtr, [string,
                                  string,
                                  ref.types.uint32,
                                  string,
                                  string,
                                  paSampleSpecPtrT,
                                  voidPtrT,
                                  voidPtrT,
                                  errorPtrT]],
  "pa_simple_free": [ref.types.void, [paSimplePtr]]
});


class SampleSpecification {
  constructor(format, channels, rate) {
    this.m_format = format;
    this.m_channels = channels;
    this.m_rate = rate;
  }

  get format() {
    return this.m_format;
  }

  get channels() {
    return this.m_channels;
  }

  get rate() {
    return this.m_rate;
  }
}

class SimplePulse {
  constructor(description, direction, name, sampleSpecification) {
    var ss = new paSampleSpecT();
    ss.format = sampleSpecification.format;
    ss.channels = sampleSpecification.channels;
    ss.rate = sampleSpecification.rate;
      
    var pa = pulse.pa_simple_new(null,
                                 description,
                                 direction,
                                 null,
                                 name,
                                 ss.ref(),
                                 null,
                                 null,
                                 null);

    if (pa.isNull()) {
      throw "Error creating pulse object";
    }
    
    this.pa = pa;
  }

  isNull() {
    return this.pa.isNull();
  }

  close() {
    pulse.pa_simple_free(this.pa);
  }
}

exports.SimplePulse = SimplePulse;
exports.SampleSpecification = SampleSpecification;

exports.streamDirections = streamDirections;
exports.sampleSpecificationFormats = sampleSpecificationFormats;
