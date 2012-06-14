
// Load The Aurduino Firmata Library
var five = require('johnny-five');

// TODO: Make This Wait For The Board Ready Before Returning

var board = new five.Board();

// Connect To The Arduino
module.exports = board;

