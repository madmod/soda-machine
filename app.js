
/**
 * Module dependencies.
 */

var express = require('express')
  , index = require('./routes/index')
  , sodamachine = require('./routes/sodamachine');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public', { maxAge: 1 }));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Create Soda Machine


// Routes

// Index Page
app.get('/', index);

// Control API

// Test The Arduino Connection
app.get('/test', sodamachine.test);
app.get('/test/:pin([0-9]+)', sodamachine.test);
app.get('/test/:stateOption', sodamachine.test);
app.get('/test/:stateOption/:delay([0-9]+)', sodamachine.test);
app.get('/test/:pin([0-9]+)/:stateOption', sodamachine.test);
app.get('/test/:pin([0-9]+)/:stateOption/:delay([0-9]+)', sodamachine.test);


// Get The List Of Sodas
app.get('/soda', sodamachine.getSodas);
// Get A Soda By Index
app.get('/soda/:index([0-9]+)', sodamachine.getSoda);
// Vend A Soda By Index
app.get('/soda/:index([0-9]+)/vend', sodamachine.vendSoda);
// Get A Random Soda From The List
app.get('/soda/random', sodamachine.randomSoda);
// Vend A Random Soda From The List
app.get('/soda/random/vend', sodamachine.vendRandomSoda);

// Get The Light State
app.get('/light', sodamachine.getLight);
// Toggle And Get The Light State
app.get('/light/toggle', sodamachine.toggleLight);
// Set The Light State
app.get('/light/:state', sodamachine.setLight);

// Start The Server

app.listen(80, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

