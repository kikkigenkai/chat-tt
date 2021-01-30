const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const busboyBodyParser = require('busboy-body-parser');

const messagesRoutes = require('./routes/messages');
const apiRoutes = require('./api/apiRoutes');
const docsRoute = require('./routes/docs');

const MONGODB_URI = 'mongodb+srv://kikkigenkai:jNRSBUKJp7MsfbZ5@cluster0.9s9kv.mongodb.net/chat?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(busboyBodyParser());
app.use(busboyBodyParser({limit: '35mb', multi: true}));
app.use(express.json());

app.use('/messages', messagesRoutes);
app.use('/api/messages', apiRoutes);
app.use('/docs', docsRoute);

(async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
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