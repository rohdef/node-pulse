"use strict";

const ref = require("ref");
const ffi = require("ffi");
const refStruct = require("ref-struct");

var paSampleSpecT = refStruct({
  "pa_sample_format_t": ref.types.uint32,
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

var ss = new paSampleSpecT();
ss.format = 3;
ss.channels = 2;
ss.rate = 44100;

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

class SimplePulse {
  constructor(name, description) {
    this.pa = pulse.pa_simple_new(null,
                             name,
                             1,
                             null,
                             description,
                             ss.ref(),
                             null,
                             null,
                             null);
  }

  isNull() {
    return this.pa.isNull();
  }

  close() {
    pulse.pa_simple_free(this.pa);
  }
}

exports.SimplePulse = SimplePulse;
