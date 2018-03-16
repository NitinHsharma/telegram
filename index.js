const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')


const app = express()



app.use(bodyParser.json());

app.get('/', (req, res) => {

	res.send('pong')
})

app.get('/start', (req, res) => {

	res.send('Hello')
})

app.post('/hook', (req, res) => {

	let message = req.body.message;
	let chat_id = message.chat.id;
	let user_name = (message.from.first_name !== '' ? message.from.first_name : 'Guest');

	if (message.text) {
		let text = message.text;

		if (text.indexOf('wiki') >= 0) {
			let userText = text.split(' ');

			https.get(`https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=${userText[1]}&format=json`, (response,err) => {
				if (err) {
					console.log(err);
					res.send({
						method: 'sendMessage',
						chat_id: chat_id,
						text: `You said ${text}`
					});
				} else {
					console.log(response);
					res.send({
						method: 'sendMessage',
						chat_id: chat_id,
						text: `${response.body}`
					});
				}
			});
		} //https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=pizza&format=json
		else {

			res.send({
				method: 'sendMessage',
				chat_id: chat_id,
				text: `You said ${text}`
			});
		}
	}
})



app.use((req, res) => {
	console.log(req);
})

var server = app.listen(process.env.PORT || 5000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})