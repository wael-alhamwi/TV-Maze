var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('./client'));
app.use(bodyParser.urlencoded({extended: true}));

require('./api/routes')(app)

app.get('*', function (req, res) {
	res.sendFile('/client/views/index.html', { root: __dirname });
})

app.listen(8080, function () {
	console.log('Server is running.')
});