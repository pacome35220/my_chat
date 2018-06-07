var socket = io.connect('http://localhost:8080');

var name = prompt('What\'s yout name ?');
var channel = document.title;

socket.emit('new_client', {
	name: name,
	channel: channel
});

document.title = name + ' - ' + document.title;

socket.on('new_client', function(client) { // client.name, client.channel
	if (client.channel == channel)
		$('#zone_chat').append('<p><em>' + client.name + ' join the channel.</em></p>');
})

socket.on('get_history', function(data) { // data.channel, data.history
	if (data.channel == channel)
		for (var i = 0; i < data.history.length; i++)
			put_message(data.history[i].name, data.history[i].message);
});

socket.on('message', function(data) { // data.channel, data.name, data.message
	if (data.channel == channel)
		put_message(data.name, data.message)
})

$('#chat_form').submit(function() {
	var message = $('#message').val();
	if (message.match(/\S/)) {
		socket.emit('message', {
			message: message,
			channel: channel
		});
		console.log(message + " : " + channel)
		put_message(name, message);
		$('#message').val('').focus();
	}
	return false;
});

function put_message(name, message) {
	$('#zone_chat').append('<p><strong>' + name + ":" + '</strong> ' + message + '</p>');
	$('section').animate({
		scrollTop: 2344232
	});
}