var data = require('../app.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('list.ejs', {
		discord: data.discord
	});
});

router.post('/', function(req, res) {
	res.redirect("/" + req.body.new_channel);
});

module.exports = router;
