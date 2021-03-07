const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const busboyBodyParser = require('busboy-body-parser');
const { parsed: { DB_URI } } = require('dotenv').config();

const homeRoute = require('./routes/home');
const editRoute = require('./routes/edit');
const docsRoute = require('./routes/docs');

const messagesApiRoute = require('./api/MessageModule');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(busboyBodyParser());
app.use(busboyBodyParser({limit: '35mb', multi: true}));
app.use(express.json());

app.use('/', homeRoute);
app.use('/edit', editRoute);
app.use('/docs', docsRoute);

app.use('/api/messages', messagesApiRoute);

(async () => {
    try {
        console.log(DB_URI);
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error) {
        console.log(error);
    }
})();