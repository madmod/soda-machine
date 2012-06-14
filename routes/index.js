
/*
 * GET home page.
 */

var sodamachine = require('./sodamachine');

module.exports = function(req, res){
  res.render('index', {
  	title: 'Soda Machine', 
  	sodas: sodamachine.getSodaList(),
  	light: sodamachine.getLightState() 
  });
};

