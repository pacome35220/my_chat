module.exports = class Discord {

	constructor() {
		this.discord = [];
		this.users = [];
		this.add_channel('general');
	};

	add_channel(name) {
		this.discord.push({
			channel_name: name,
			history: [{
				name: 'God',
				message: 'Welcome to ' + name
			}]
		});
	}

	add_user(name) {
		this.users.push(name);
	}

	remove_user(name) {
		var i = this.users.indexOf(name);
		if (i != -1)
			this.users.splice(i, 1);
	}

	get_channel_id(name) {
		return (this.discord.findIndex(discord => discord.channel_name === name));
	}

	get_channel_history(channel_name) {
		var i = this.get_channel_id(channel_name);
		if (i != -1)
			return (this.discord[i].history);
	}

	add_message_history(channel, name, message) {
		this.get_channel_history(channel).push({
			name: name,
			message: message
		});
	}

	checkSignIn(req, res, next) {
		if (req.session.user)
			next();
		else
			next("Not logged in !");
	}
}
