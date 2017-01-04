"use strict";

const pulseLib = require("./PulseLib.js");
const enums = require("./enums.js");

class SimplePulse {
  constructor(description, direction, name, sampleSpecification) {
    var ss = new pulseLib.SampleSpecT();
    ss.format = sampleSpecification.format;
    ss.channels = sampleSpecification.channels;
    ss.rate = sampleSpecification.rate;

    var map = new pulseLib.channelMaps.ChannelMap();
    pulseLib.channelMaps.initMono(map.ref());

    var device = null;
    if (direction === enums.streamDirections.record) {
//      device = "alsa_output.usb-Yamaha_Corporation_Steinberg_UR22-00.analog-stereo.monitor";
    }

    var error = pulseLib.createErrorT();
    var pa = pulseLib.simple.create(null,
                                    description,
                                    direction,
                                    device,
                                    name,
                                    ss.ref(),
                                    null, //map.ref(),
                                    null,
                                    error);
      
    if (pa.isNull()) {
      var errorMessage = pulseLib.errorToString(error);
      throw "Error creating PulseAudio object, error number was: "
        + error.deref()
        + ", and the message was: "
        + errorMessage;
    }
    
    this.pa = pa;
  }

  isNull() {
    return this.pa.isNull();
  }

  close() {
    pulseLib.simple.free(this.pa);
  }

  static builder() {
    class Builder {
      build() {
        return new SimplePulse(this.name,
                               this.direction,
                               this.description,
                               this.sampleSpecification);
      }

      withName(name) {
        this.name = name;

        return this;
      }

      withDescription(description) {
        this.description = description;

        return this;
      }

      withSampleSpecification(sampleSpecification) {
        this.sampleSpecification = sampleSpecification;
        
        return this;
      }

      withDirection(direction) {
        this.direction = direction;

        return this;
      }
    }

    return new Builder();
  }
}

exports.SimplePulse = SimplePulse;
