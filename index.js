const express = require('express')



const app = express()

console.log(app);



app.get('/', (req, res) => {
	console.log('working');
	res.send('Hello World!')
})

app.use((req, res) => {
	console.log(req);
})

var server = app.listen(process.env.PORT || 5000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})