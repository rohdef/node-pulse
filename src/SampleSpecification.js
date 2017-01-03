"use strict";

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

exports.SampleSpecification = SampleSpecification;
