
var relayProto = {

	// Possible Pin State Configurations For On/Off With Mode And State
	stateOptions: {
		relay: {
			// Output Low Connects The Relay To Ground
			on: 0,
			// Input Low Disconnects The Relay From Ground
			off: 1,
			// Output Mode
			mode: 1,
			// Press Time
			delay: 500
		},
		led: {
			// Output High Turns LED On
			on: 1,
			// Output Low Turns LED Off
			off: 0,
			// Output Mode
			mode: 1,
			// Press Time
			delay: 1000
		}
	},

	ready: false,

	inverted: false,

	defaultStateOption: 'relay',

	// Takes The Pin, State Option Name, and Normally On/Off Boolean (Normally Off/false is Default)
	init: function (pin, stateOption) {
		// Save The Relay Pin
		this.pin = pin;
		// Set The State Option
		this.stateOption = this.stateOptions[stateOption] || this.stateOptions[this.defaultStateOption];
		// Turn The Relay Off So We Know The State
		this.off();
		
		// Set The Pin Mode
		this.whenReady(function () {
			global.board.pinMode(pin, this.stateOption.mode);
		});
		
		// Make This Chainable
		return this;
	},

	invert: function () {
		// Toggle The Inverted Option
		this.inverted = !this.inverted;
		// TODO: Make Sure This Is Always Called Before Init Or Something
		this.toggle();
		
		// Make This Chainable
		return this;
	},

	whenReady: function (callback) {
		// Use Closure Scope To Access Relay Instance
		var relay = this;
		// Get The Arguments As An Array
		var args = Array.prototype.slice.call(arguments);
		if (relay.ready) {
			// Stop Recursion And Call Ready
			callback.apply(relay, args.slice(1));
		} else {
			// Wait For Ready
			setTimeout(function () {
				relay.whenReady.apply(relay, args);
			}, 200);
		}
		
		// Make This Chainable
		return this;
	},

	setPin: function (state) {
		// Apply The Inverted Option For Normally Open/Normally Closed Relays Using A Logical XOR
		var iState = +(!state != !this.inverted);
		var pin = this.pin;
		var mode = this.mode;
		// Wait For The Board To Be Ready
		this.whenReady(function () {
			// Set The Pin State
			global.board.digitalWrite(pin, iState);
		});
		
		// Make This Chainable
		return this;
	},

	on: function () {
		// Save The State
		this.state = true;
		
		// Call Set Pin With The State Option Settings
		this.setPin.call(this, this.stateOption.on);
		
		// Make This Chainable
		return this;
	},

	off: function () {
		// Save The State
		this.state = false;
		
		// Call Set Pin With The State Option Settings
		this.setPin.call(this, this.stateOption.off);
		
		// Make This Chainable
		return this;
	},

	toggle: function () {
		var on = this.getState();
		if (on) this.off();
		else this.on();
		
		// Make This Chainable
		return this;
	},

	getState: function () {
		// Return The State
		return this.state;
	},

	setState: function (state) {
		// Return The On Or Off Result
		return state ? this.on() : this.off();
	},

	// Turn The Relay On And Off To Simulate A Button Press
	press: function (callback, delay) {
		// Use Closure Scope To Access Relay Instance
		var relay = this;
		// Wait Half Of A Second
		setTimeout(function () {
			// Toggle The Relay
			relay.toggle.call(relay);
			// Wait Half Of A Second
			setTimeout(function () {
				// Toggle The Relay
				relay.toggle.call(relay);
				// Call The Callback
				if (typeof callback == "function")
					callback.call(relay);
			}, (delay || relay.stateOption.delay));
		}, (delay || relay.stateOption.delay));
		
		// Make This Chainable
		return this;
	}

};

// Get The Board
global.board = require('./board');

// Check For Board Ready
global.board.on("ready", function () {
	global.Relay.prototype.ready = true;
});

// Create The Relay Class
global.Relay = relayProto.init;

Relay.prototype = relayProto;

Relay.constructor = Relay.prototype.init;

module.exports = Relay;

