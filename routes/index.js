var name = require('../app.js');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../views', "login.html"));
});

router.post('/', function(req, res) {
//	if (name.indexOf(req.body.user_name) == -1)
//		name.push(req.body.user_name);
	res.redirect("/list");
});

module.exports = router;
