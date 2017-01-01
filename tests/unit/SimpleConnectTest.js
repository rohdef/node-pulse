"use strict";

var pulse = require("../../src/pulse.js");

describe("Connecting to pulseaudio", () => {
  it("should do a simple connection", () => {
    var pa = new pulse.SimplePulse("From test", "by RF");
    
    expect(pa.isNull()).toBe(false);

    pa.close();
  });
});
