"use strict";

const ref = require("ref");
const Struct = require("ref-struct");
const Array = require("ref-array");
const ffi = require("ffi");

var paSampleSpecT = Struct({
  format: ref.types.uint32,
  rate: ref.types.uint32,
  channels: ref.types.uint32
});
var paSampleSpecPtrT = ref.refType(paSampleSpecT);

var paChannelMapT = Struct({
  channels: ref.types.uint8,
  map: Array(ref.types.uint32)
});
var paChannelMapPtrT = ref.refType(paChannelMapT);

var paSimple = ref.types.void;
var paSimplePtr = ref.refType(paSimple);

var errorT = ref.types.int;
var errorPtrT = ref.refType(errorT);

var string = ref.types.CString;
var voidPtrT = ref.refType(ref.types.void);

var pulse = ffi.Library("libpulse-simple", {
  "pa_simple_new": [paSimplePtr, [string,
                                  string,
                                  ref.types.uint32,
                                  string,
                                  string,
                                  paSampleSpecPtrT,
                                  paChannelMapPtrT,
                                  voidPtrT,
                                  errorPtrT]],
  "pa_simple_free": [ref.types.void, [paSimplePtr]],
  "pa_simple_get_latency": [ref.types.uint64, [paSimplePtr, errorPtrT]],
  "pa_strerror": [string, [errorT]],
  "pa_channel_map_init_mono": [paChannelMapPtrT, [paChannelMapPtrT]]
});


function createErrorT() {
  return ref.alloc(errorT);
}

exports.createErrorT = createErrorT;
exports.SampleSpecT = paSampleSpecT;

exports.simple = {
  create: pulse.pa_simple_new,
  free: pulse.pa_simple_free,
  getLatency: pulse.pa_simple_get_latency
};

exports.channelMaps = {
  initMono: pulse.pa_channel_map_init_mono,
  ChannelMap: paChannelMapT
};

exports.errorToString = function(errorT) {
  return pulse.pa_strerror(errorT.deref());
};
