if(process.env.NODE_ENV != 'production'){
    require('dotenv').config({path: __dirname + '/.env'})
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true, useUnifiedTopology: true
});


const indexRouter = require('./routes/routes');
const directorRouter = require('./routes/directors_route');

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

app.use('/',indexRouter);
app.use('/directors', directorRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running....');
});