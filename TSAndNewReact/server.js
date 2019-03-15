const express = require('express');
const path = require('path');
const port = 8080;
const app = express();

// Serve static assets
app.use(express.static(__dirname));

// Route all requests to index.html
app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, function() {
	console.log('Server Started for ' + __dirname + '\\dist');
	console.log('Listening on port', port,
		'at', new Date().toLocaleTimeString());
});
