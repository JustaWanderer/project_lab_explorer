// const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const editorRouter = require('./modules/editor/editor-router');

app.use(express.static('static'));
app.use(editorRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
