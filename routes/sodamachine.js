
var Relay = require('./relay');

// Create The Relays
// 1-6 Relay Is Soda
// 7 Relay Coin Button
// 8 Relay Light
// 4-7 Arduino Is 5-8 Relay
// 12-9 Arudino Is 1-4 Relay (Reverse Order)
// I know right, code is easier to change than hardware. It makes sense, I promise.


// Active LED On Arduino With Default On
//var active = new Relay(8, false, 'led').on();
// Ready Transistor To Connect Relay Module Ground And Avoid Start Up Triggering The Relays
//var ready = new Relay(12, false, 'relay').invert().on();
// Logo Light With Default On
var light = new Relay(7);
// Credit Accepted Circut Normally Closed
var coins = new Relay(6).invert();
// Get The Soda Items
var sodas = require('../sodas');

var mapping = [12, 11, 10, 9, 4, 5];

for (var i = 0; i < sodas.length; i++) {
	sodas[i].relay = new Relay(mapping[i]).invert();
}


exports.test = function (req, res) {
	// Get The Options And Set Defaults
	var pin = req.params.pin || active.pin,
		stateOption = req.params.stateOption,
		delay = req.params.delay,
		testInfo = "Testing Pin " + pin + " With State Option \"" + (stateOption || "Default") + "\" For " + (delay || "Default") + " Milliseconds...";
	
	// Inform The User Of The Test Parameters
	console.log(testInfo);
	res.send(testInfo);
	
	// Test The Pin With The State Options For The Delay Time
	new Relay(pin, false, stateOption).press(function () {
		console.log("Test Complete");
	}, delay);
	
};


var getSodaAtIndex = function (index) {
	var index = parseInt(index);
	if (sodas.length < index) {
		throw Error("Soda Index " + index + " Does Not Exist!");
	}
	return sodas[index];
};


exports.getSodas = function (req, res) {
	res.send(sodas);
};


exports.getSodaList = function () {
	return sodas;
};


exports.getSoda = function (req, res) {
	res.send(getSodaAtIndex(req.params.index));
};


var vend = function (soda, callback) {
	console.log("Vending Soda", soda.name);
	// Add A Credit For The Soda
	coins.press(function () {
		// Vend The Soda
		soda.relay.press(function () {
			// Call Callback When Done
			callback.call(this);
		});
	}, 100);
};


exports.vendSoda = function (req, res) {
	// Get The Soda
	var soda = getSodaAtIndex(req.params.index);
	vend(soda, function () {
		// Return OK Message When Done
		res.send("OK");
	});
};


// Get A Random Soda
var getRandomSoda = function () {
	var index = Math.floor(Math.random() * sodas.length),
		soda = getSodaAtIndex(index);
	return soda;
};


// Return A Random Soda
exports.randomSoda = function (req, res) {
	res.send(getRandomSoda());
};


// Vend A Random Soda
exports.vendRandomSoda = function (req, res) {
	// Get The Random Soda
	var soda = getRandomSoda();
	vend(soda, function () {
		// Return OK Message When Done
		res.send("OK");
	});
};


// Toggle The Light State And Return The New Light State
exports.toggleLight = function (req, res, next) {
	// Toggle The Light State
	light.toggle();
	
	// Return The New Light State
	res.send(light.getState());
};


// Set The Light State (expects a boolean or string in the body)
exports.setLight = function (req, res) {
	var state = req.params.state,
		value;
	
	// Cast The Request Value To A Boolean
	if (state == "on" || state == "true" || state == "1") {
		value = true;
	} else if (state == "off" || state == "false" || state == "0") {
		value = false;
	} else {
		throw new Error("The String " + state + " Is Not A Valid Light State! (Accepts on/true/1 or off/false/0)");
	}
	
	// Set The New State
	light.setState(value);
	
	res.send("OK");
};


exports.getLight = function (req, res) {
	res.send(light.getState());
};


exports.getLightState = function () {
	return light.getState();
};


