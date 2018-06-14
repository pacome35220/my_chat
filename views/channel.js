var socket = io.connect('http://localhost:8080');
//var socket = io.connect('10.19.254.144:8080');

socket.emit('new_client', {
	name: name,
	channel: channel
});

document.title = name + ' - ' + document.title;

socket.on('new_client', function(data) { // data.name, data.channel
	if (data.channel == channel)
		$('#zone_chat').append('<p><em>' + data.name + ' join the channel.</em></p>');
});

socket.on('get_history', function(data) { // data.channel, data.history
	if (data.channel == channel && data.history)
		for (var i = 0; i < data.history.length; i++)
			put_message(data.history[i].name, data.history[i].message);
});

socket.on('message', function(data) { // data.channel, data.name, data.message
	if (data.channel == channel)
		put_message(data.name, data.message)
});

$('#chat_form').submit(function() {
	var message = $('#message').val();
	if (message.match(/\S/)) {
		socket.emit('message', {
			message: message,
			channel: channel
		});
		$('#message').val('').focus();
	}
	return false;
});

function put_message(name, message) {
	$('#zone_chat').append('<p><strong>' + name + ":" + '</strong> ' + message + '</p>');
	$('#zone_chat').animate({
		scrollTop: $('#zone_chat').prop('scrollHeight')
	}, 500);
}
