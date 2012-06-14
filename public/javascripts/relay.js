
var relayProto = {

	board: window.board,

	init: function (pin) {
		// Save The Relay Pin
		this.pin = pin;
		
		// Make This Chainable
		return this;
	},

	set: function (mode, state) {
		// Set The Pin Mode
		this.board.pinMode(this.pin, mode);
		// Set The Pin State
		this.board.digitalWrite(this.pin, state);
		
		// Make This Chainable
		return this;
	},

	on: function () {
		// Output Low Connects The Relay To Ground
		this.set(1, 0);
		
		// Make This Chainable
		return this;
	},

	off: function (mode, state) {
		// Input Low Disconnects The Relay From Ground
		this.set(1, 0);
		
		// Make This Chainable
		return this;
	},
	
	// Turn The Relay On And Off To Simulate A Button Press
	press: function () {
		// Turn The Realy On
		this.on();
		// Use Closure Scope To Access Relay Instance
		var me = this;
		// Wait Half Of A Second
		setTimeout(function () {
			// Release The Relay	
			me.off();
		}, 500);
	}

};

window.Relay = relayProto.init;

Relay.prototype = relayProto;

Relay.constructor = Relay.prototype.init;

