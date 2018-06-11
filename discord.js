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
		this.users.splice(this.users.indexOf(name), 1);
	}

	get_channel_id(name) {
		return (this.discord.findIndex(discord => discord.channel_name === name));
	}

	get_history(channel_name) {
		return (this.discord[this.get_channel_id(channel_name)].history);
	}

	checkSignIn(req, res, next) {
		if (req.session.user)
			next();
		else
			next("Not logged in !");
	}
}
