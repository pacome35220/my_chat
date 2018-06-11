module.exports = class Discord {

	constructor() {
		this.discord = [];
		this.name = [];
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
		this.name.push(name);
	}

	get_channel_id(name) {
		return (this.discord.findIndex(discord => discord.channel_name === name));
	}

	get_history(name) {
		return (this.discord[this.get_channel_id(name)].history);
	}

	checkSignIn(req, res, next) {
		if (req.session.user)
			next();
		else
			next("Not logged in !");
	}
}
