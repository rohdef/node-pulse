"use strict";

const pulseLib = require("./PulseLib.js");

/**
 * Testing with a simple class
 */
class SimplePulse {
  constructor(description, direction, device, name, sampleSpecification, map) {
    var error = pulseLib.createErrorT();
    var pa = pulseLib.simple.create(null,
                                    description,
                                    direction,
                                    device,
                                    name,
                                    sampleSpecification,
                                    map,
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

  get latency() {
    var error = pulseLib.createErrorT();
    var latency = pulseLib.simple.getLatency(this.pa, error);

    return latency;
  }

  close() {
    pulseLib.simple.free(this.pa);
  }

  static builder() {
    class Builder {
      constructor() {
        this.map = null;
        this.device = null;
      }
      
      build() {
        return new SimplePulse(this.name,
                               this.direction,
                               this.device,
                               this.description,
                               this.sampleSpecification,
                               this.map);
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
        var pulseSpecification = new pulseLib.SampleSpecT();
        pulseSpecification.format = sampleSpecification.format;
        pulseSpecification.channels = sampleSpecification.channels;
        pulseSpecification.rate = sampleSpecification.rate;
        
        this.sampleSpecification = pulseSpecification.ref();
        
        return this;
      }

      withDirection(direction) {
        this.direction = direction;

        return this;
      }

      withDevice(device) {
        this.device = device;

        return this;
      }

      withMap() {
        var map = new pulseLib.channelMaps.ChannelMap();
        pulseLib.channelMaps.initMono(map.ref());

        this.map = map.ref();

        return this;
      }
    }

    return new Builder();
  }
}

exports.SimplePulse = SimplePulse;
