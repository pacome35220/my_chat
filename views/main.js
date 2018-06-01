var socket = io.connect('http://localhost:8080');

var name = prompt('What\'s yout name ?');

socket.emit('new_client', name);
document.title = name + ' - ' + document.title;

socket.on('message', function(data) {
	put_message(data.name, data.message)
})

socket.on('get_messages', function(history) {
	for (var i = 0; i < history.length; i++)
		put_message(history[i].name, history[i].message);
});

socket.on('new_client', function(name) {
	$('#zone_chat').append('<p><em>' + name + ' join the channel !</em></p>');
})

$('#chat_form').submit(function() {
	var message = $('#message').val();
	if (message.match(/\S/)) {
		socket.emit('message', message);
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
