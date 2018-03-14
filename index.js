const express = require('express')
const bodyParser = require('body-parser')


const app = express()

console.log(app);

app.use(bodyParser.json());

app.get('/', (req, res) => {
	
	res.send('pong')
})

app.get('/start', (req, res) => {

	res.send('Hello')
})

app.post('/hook',(req,res)=>{
	console.log('Come here',req.body);
	res.send({
					method: 'sendMessage',
					chat_id: 480882720,
					text: 'You said ' + req.body.message.chat.text
				});
})



app.use((req, res) => {
	console.log(req);
})

var server = app.listen(process.env.PORT || 5000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

