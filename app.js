var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var session = require('cookie-session');
var path = require('path');
var compression = require('compression');
var urlencodedParser = require('body-parser').urlencoded({
	extended: false
});

var history = [];

app.use(compression(),
	express.static(path.join(__dirname, 'views')),
	session({
		secret: 'list'
	}),
	function(req, res, next) {
		if (typeof(req.session.list) == 'undefined')
			req.session.list = [];
		next();
	}
);

app.get('/', function(req, res) {
	res.render('list.ejs', {
		list: req.session.list
	});
});

app.post('/', urlencodedParser, function(req, res) {
	res.redirect("/" + req.body.new_channel);
});

app.get('/:name', function(req, res) {
	if (req.session.list.indexOf(req.params.name) == -1)
		req.session.list.push(req.params.name);
	res.render('channel.ejs', {
		channel: req.params.name
	});
});

io.on('connection', function(socket, name) {
	socket.on('new_client', function(name) {
		socket.name = name;
		socket.broadcast.emit('new_client', name);
		socket.emit('get_messages', history);
	});
	socket.on('message', function(message) {
		socket.broadcast.emit('message', {
			name: socket.name,
			message: message
		});
		history.push({
			name: socket.name,
			message: message
		});
	});
});

app.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.redirect("/");
});

console.log("Listening on localhost:8080\n");

server.listen(8080);
