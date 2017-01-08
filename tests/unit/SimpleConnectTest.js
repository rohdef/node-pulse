"use strict";

var PulseLibMock = require("./PulseLibMock.js");
var enums = require("../../src/enums.js");
var SimplePulseRaw = require("../../src/SimplePulse.js");

describe("When connecting to pulseaudio it", () => {
  var SimplePulse;
  var PulseLib;
  var pulseBuilder;

  var createIndexes = {
    server: 0,
    name: 1,
    direction: 2,
    device: 3,
    description: 4,
    sampleSpecification: 5,
    channelMap: 6,
    bufferAttributes: 7,
    errorPointer: 8
  };

  beforeEach(() => {
    PulseLib = PulseLibMock();
    SimplePulse = SimplePulseRaw({
      pulseLib: PulseLib
    });
    
    pulseBuilder = SimplePulse.builder();
  });

  describe("the builder should pass on arguments to PulseLib", () => {
    describe("for the name it", () => {
      it("should create a simple connection for 'Zones Of Thought'", () => {
        pulseBuilder
          .withName("Zones Of Thought")
          .build();

        expectCalls(createIndexes.name, "Zones Of Thought");
      });

      it("should create a simple connection for 'The Little Prince'", () => {
        pulseBuilder
          .withName("The Little Prince")
          .build();

        expectCalls(createIndexes.name, "The Little Prince");
      });
    });
    
    describe("for the direction it", () => {
      it("should do a simple playback connection", () => {
        pulseBuilder
          .withDirection(enums.streamDirections.playback)
          .build();
        
        expectCalls(createIndexes.direction, enums.streamDirections.playback);
      });

      it("should do a simple upload connection", () => {
        pulseBuilder
          .withDirection(enums.streamDirections.upload)
          .build();

        expectCalls(createIndexes.direction, enums.streamDirections.upload);
      });
    });

    describe("for the descrition it", () => {
      it("should create a simple connection for 'Trud Silipan'", () => {
        pulseBuilder
          .withDescription("Trud Silipan")
          .build();

        expectCalls(createIndexes.description, "Trud Silipan");
      });

      it("should create a simple connection for 'The Tippler'", () => {
        pulseBuilder
          .withDescription("The Tippler")
          .build();

        expectCalls(createIndexes.description, "The Tippler");
      });
    });

    describe("for the device it", () => {
      it("should create a simple connection for 'HDMI stereo output'", () => {
        pulseBuilder
          .withDevice("alsa_output.pci-0000_01_00.1.hdmi-stereo")
          .build();

        expectCalls(createIndexes.device, "alsa_output.pci-0000_01_00.1.hdmi-stereo");
      });
      
      it("should create a simple connection for 'Steinberg UR22 stereo monitor'", () => {
        pulseBuilder
          .withDevice("alsa_output.usb-Yamaha_Corporation_Steinberg_UR22-00.analog-stereo.monitor")
          .build();

        expectCalls(createIndexes.device,
                    "alsa_output.usb-Yamaha_Corporation_Steinberg_UR22-00.analog-stereo.monitor");
      });
    });

    describe("for the sample specification it", () => {
      it("should create a simple connection for a sample specification", () => {
        var fakeSpecification = { format: "ulaw", channels: 5, rate: 44100};
        pulseBuilder
          .withSampleSpecification(fakeSpecification)
          .build();

        expectCalls(createIndexes.sampleSpecification, {
          format: "ulaw",
          channels: 5,
          rate: 44100
        });
      });

      it("should create a simple connection for another sample specification", () => {
        var fakeSpecification = { format: "float 32 LE", channels: 2, rate: 352800};
        pulseBuilder
          .withSampleSpecification(fakeSpecification)
          .build();

        expectCalls(createIndexes.sampleSpecification, {
          format: "float 32 LE",
          channels: 2,
          rate: 352800
        });
      });
    });

    xdescribe("for the channel map it", () => {
      // TODO the map is not really implemented yet
    });

    var expectCalls = function(index, value) {
      var createCalls = PulseLib.simple.create.calls;
      expect(createCalls.count())
        .toBe(1);
      
      expect(createCalls.argsFor(0)[index])
        .toEqual(value);
    };
  });

  it("should use the native library when asking for latency", () => {
    spyOn(PulseLib.simple, "getLatency");
    spyOn(PulseLib, "createErrorT");
    var mySimple = {
      isNull: () => false
    };
    var error = {};
    
    PulseLib.simple.create.and.returnValue(mySimple);
    PulseLib.createErrorT.and.returnValue(error);

    var pulse = pulseBuilder.build();
    
    PulseLib.simple.getLatency.and.returnValue(612);
    expect(pulse.latency).toBe(612);
    expect(PulseLib.simple.getLatency).toHaveBeenCalledWith(mySimple, error);

    PulseLib.simple.getLatency.and.returnValue(3);
    expect(pulse.latency).toBe(3);
    expect(PulseLib.simple.getLatency).toHaveBeenCalledWith(mySimple, error);
  });

  it("should free the native connection on close", () => {
    spyOn(PulseLib.simple, "free");
    var mySimple = {
      isNull: () => false
    };
    
    PulseLib.simple.create.and.returnValue(mySimple);

    var pulse = pulseBuilder.build();
    pulse.close();

    expect(PulseLib.simple.free).toHaveBeenCalledWith(mySimple);
  });
});
