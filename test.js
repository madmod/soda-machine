var five = require("johnny-five"),
    board;

board = new five.Board();

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  var val = 0;
  var pin = 6;
  
  this.pinMode( pin, 1 );
  
  // Mode Table
  // INPUT:   0
  // OUTPUT:  1
  // ANALOG:  2
  // PWM:     3
  // SERVO:   4

  // Create a loop to "flash/blink/strobe" an led
  this.loop( 1000, function() {
	
    this.digitalWrite( pin, (val = val ? 0 : 1) );
	
  });
  
});


// Schematic
// http://arduino.cc/en/uploads/Tutorial/ExampleCircuit_bb.png
