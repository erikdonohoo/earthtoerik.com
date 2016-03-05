
/**
 * Module dependencies.
 */

var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var app = module.exports = express();

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('dbstring', process.env.MONGOHQ_URL);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static('public'));
app.use(express.static('views'));

// JSON API
require('./routes/api/post').load(app);

// posts
app.get('/posts/:name', function (req, res) {
	res.sendFile(__dirname + '/views/posts/' + req.params.name + '.html');
});

// redirect all others to the index (HTML5 history)
app.get('/*', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// Start server

app.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
