const express = require('express');
const { randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.use(cors());

const posts = {};

app.get('/posts', (req,res)=>{

    res.send(posts);
})

app.post('/posts', async (req,res)=>{

    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:5006/events', {
        type : 'PostCreated',
        data: {
            id, title
        }
    })

    res.status(201).send(posts[id]);
})


app.post('/events', (req,res)=>{
   
    console.log('Received Event', req.body.type);
    res.send({})
  })


const server = app.listen(5000,()=>{
    console.log('Server listing to 5000')
});

  //Handle  unhanlded promise rejecttion
  process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`)
    //close server
     server.close(()=> process.exit(1))
     
})
