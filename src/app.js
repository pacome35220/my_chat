var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var compression = require('compression');
var body_parser = require('body-parser');
var session = require('cookie-session');

var port = process.env.PORT || 8080;

var Discord = require('./discord.js');
var discord = new Discord();

module.exports = {
	discord: discord,
	checkSignIn: discord.checkSignIn
};

app.use(express.static('views/'),
	body_parser.urlencoded({
		extended: false
	}),
	session({
		secret: "Google told me that this value was useless",
		resave: false,
		saveUninitialized: false
	}),
	compression(),
);

app.use('/', require('./routes/index.js'));
app.use('/list', require('./routes/list.js'));

app.get('/logout', function(req, res) {
	console.log(req.session.user + " logged out.");
	discord.remove_user(req.session.user);
	req.session = null;
	res.redirect('/');
});

app.get('/:name', discord.checkSignIn, function(req, res) {
	var name = req.params.name;

	if (name.length < 25 && name.match(/^[a-zA-Z]+$/)) {
		if (discord.get_channel_id(name) == -1)
			discord.add_channel(name);
		res.render('channel.ejs', {
			channel: name,
			username: req.session.user
		});
	} else
		res.redirect('/list');
});

app.use(function(err, req, res, next) {
	console.log("Error : ", err);
	res.redirect('/');
});

function transform_message(str) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return str.replace(/[&<>"']/g, function(i) {
		return map[i];
	});
}

io.on('connection', function(socket) {
	socket.on('new_client', function(client) { // client.name, client.channel
		socket.name = client.name;
		socket.broadcast.emit('new_client', client);
		socket.emit('get_history', {
			channel: client.channel,
			history: discord.get_channel_history(client.channel)
		});
	});
	socket.on('message', function(data) { // data.channel, data.message
		if (data.message.length > 240)
			return;
		var message = {
			channel: data.channel,
			name: socket.name,
			message: transform_message(data.message)
		};
		socket.emit('message', message);
		socket.broadcast.emit('message', message);
		discord.add_message_history(data.channel, socket.name, message.message);
	});
});

console.log("Port : " + port);

server.listen(port);
