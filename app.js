const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const busboyBodyParser = require('busboy-body-parser');
const { DB_URI } = require('./connection');

const homeRoute = require('./routes/home');
const editRoute = require('./routes/edit');
const docsRoute = require('./routes/docs');

const apiGetListRoute = require('./api/getList');
const apiGetOneRoute = require('./api/getOne');
const apiCreateMsgRoute = require('./api/createMessage');
const apiEditMsgRoute = require('./api/editMessage');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(busboyBodyParser());
app.use(busboyBodyParser({limit: '35mb', multi: true}));
app.use(express.json());

app.use('/', homeRoute);
app.use('/edit', editRoute);
app.use('/docs', docsRoute);

app.use('/api/messages/list', apiGetListRoute);
app.use('/api/messages/single', apiGetOneRoute);
app.use('/api/messages', apiCreateMsgRoute);
app.use('/api/messages', apiEditMsgRoute);

(async () => {
    try {
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