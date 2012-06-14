
var SodaMachineProto = {

	init: function (sodas) {
		// Create The Relays
		// Logo Light
		this.light = new Relay(0);
		// Credit Accepted Circut
		this.coins = new Relay(1);
		// Make The Soda Items
		this.sodas = [
			{
				name: 'Dr. Pepper'
			},
			{
				name: 'Sprite'
			},
			{
				name: 'Coke'
			},
			{
				name: 'Ranch Dressing'
			}
		];
		// Connect The Relays
		var offset = 2;
		for (var i = 0; i < this.sodas.length; i++) {
			this.sodas[i].relay = new Relay(i + offset);
		}
		
		// Make This Chainable
		return this;
	},

	vend: function (soda) {
		// Add A Credit For The Soda
		this.coins.press();
		// Vend The Soda
		soda.relay.press();
		
		// Make This Chainable
		return this;
	}

};

window.SodaMachine = SodaMachineProto.init;

SodaMachine.prototype = SodaMachineProto;

SodaMachine.constructor = SodaMachine.prototype.init;

