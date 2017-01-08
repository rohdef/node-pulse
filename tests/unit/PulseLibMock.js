"use strict";

module.exports = exports = function() {  
  var simple = {
    create: () => {
      return {
        isNull: () => false
      };
    },
    getLatency: () => {},
    free: () => {}
  };

  spyOn(simple, "create").and.callThrough();

  class SampleSpecT {
    ref() {
      return {
        format: this.format,
        channels: this.channels,
        rate: this.rate
      };
    }
  }
  spyOn(SampleSpecT.prototype, "ref").and.callThrough();

  class ChannelMapT {
    ref() {}
  }

  return {
    simple: simple,
    SampleSpecT: SampleSpecT,
    createErrorT: () => {},
    channelMaps: {
      ChannelMap: ChannelMapT,
      initMono: () => {}
    }
  };
};
