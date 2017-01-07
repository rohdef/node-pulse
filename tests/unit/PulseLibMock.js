"use strict";

module.exports = exports = function() {  
  var simple = {
    create: () => {
      return {
        isNull: () => false
      };
    },
    free: () => {}
  };

  spyOn(simple, "create").and.callThrough();

  class SampleSpecT {
    ref() {}
  }

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
