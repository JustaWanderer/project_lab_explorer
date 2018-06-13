// const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const editorRouter = require('./modules/editor/editor-router');
const usersRouter = require('./modules/users/users-router');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(editorRouter);
app.use(usersRouter);

app.get('/game', (req, res) => {
    res.sendFile(path.resolve('static/game.html'));
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
