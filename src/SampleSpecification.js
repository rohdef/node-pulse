"use strict";

const enums = require("./enums.js");

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

  static builder() {
    class Builder {
      constructor() {
        this.format = enums.sampleSpecificationFormats.signed16bitLittleEndian;
        this.channels = 2;
        this.rate = 44100;
      }

      build() {
        return new SampleSpecification(this.format, this.channels, this.rate);
      }

      withFormat(format) {
        this.format = format;

        return this;
      }

      withChannels(channels) {
        this.channels = channels;

        return this;
      }

      withRate(rate) {
        this.rate = rate;

        return this;
      }
    }

    return new Builder();
  }
}

exports.SampleSpecification = SampleSpecification;
