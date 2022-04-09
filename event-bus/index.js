const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app  = express();

const events = [];

app.use(bodyParser.json());

app.post('/events', (req,res)=>{

    const event = req.body;

    events.push(event);

    //POST SERVICE
     axios.post('http://localhost:5000/events', event);
    //COMMENT SERVICE
     axios.post('http://localhost:5002/events', event);
    //QUERY SERVICE
     axios.post('http://localhost:5004/events', event);

    //MODERATION SERVICE
     axios.post('http://localhost:5008/events', event);


    res.send({
        status: 'OK'
    })

})

app.get('/events', (req,res)=>{
    res.send(events);
})


app.listen(5006, ()=>{
    console.log('Server listing 5006');
})