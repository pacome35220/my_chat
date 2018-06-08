var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var compression = require('compression');
var body_parser = require('body-parser');
var cookie_parser = require('cookie-parser');
var session = require('express-session');

function init_new_channel(name) {
	return ({
		channel_name: name,
		history: [{
			name: 'God',
			message: 'Welcome to ' + name,
		}],
	});
}

function get_channel_id(name) {
	return (discord.findIndex(discord => discord.channel_name === name));
}

function get_history(name) {
	return (discord[get_channel_id(name)].history);
}

var discord = [init_new_channel('general')];
var name = [];

module.exports = {
	discord: discord,
	name: name
};

app.use(express.static('./views/'),
	body_parser.urlencoded({
		extended: false
	}),
	session({
		secret: "Google told me that this value was useless",
		resave: false,
		saveUninitialized: false
	}),
	compression(),
	cookie_parser(),
);

app.use('/', require('./routes/index.js'));
app.use('/list', require('./routes/list.js'));

app.get('/:name', function(req, res) {
	if (get_channel_id(req.params.name) == -1)
		discord.push(init_new_channel(req.params.name));
	res.render('channel.ejs', {
		channel: req.params.name
	});
});

app.get('/logout', function(req, res) {
	req.session.destroy(function() {
		console.log("User logged out.");
	});
	res.redirect('/login');
});

app.use('/list', function(err, req, res, next) {
	console.log(err);
	res.redirect('/');
});

io.on('connection', function(socket) {
	socket.on('new_client', function(client) { // client.name, client.channel
		socket.name = client.name;
		socket.broadcast.emit('new_client', client);
		socket.emit('get_history', {
			channel: client.channel,
			history: get_history(client.channel)
		});
	});
	socket.on('message', function(data) { // data.channel, data.message
		socket.broadcast.emit('message', {
			channel: data.channel,
			name: socket.name,
			message: data.message
		});
		get_history(data.channel).push({
			name: socket.name,
			message: data.message
		});
	});
});

console.log("Listening on localhost:8080\n");

server.listen(8080);
