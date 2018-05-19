const http = require('http');
const express = require('express');
const app = express();
const path = require("path")

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
});

app.get("/editor", (req, res) => {
    res.sendFile(path.resolve('static/editor.html'));
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});