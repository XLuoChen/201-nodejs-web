import mongoose from 'mongoose';
import express from 'express';
import config from 'config';
import router from './router';

mongoose.connect(config.get('mongoUri'));

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.send({
        'hello': 'world'
    })
})

router(app);

app.listen(config.get('httpPort'), ()=> {
    console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
})