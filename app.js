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

let userNum = 0;
let player1 = {
    dx: 0,
    dz: 0,
};
let player2 = {
    dx: 2,
    dz: 2,
};

app.get('/connect', (req, res) => {
    userNum++;
    res.json({player: userNum});
});

app.get('/checkMoves', (req, res) => {
    if (req.query.player == 1) {
        res.json(player2);
    } else {
        res.json(player1);
    }
});

app.post('/setPos', (req, res) => {
    if (req.body.player == 1) {
        player1 = req.body.playerData;
        res.send('ok');
    } else {
        player2 = req.body.playerData;
        res.send('ok');
    }
});

app.get('/listen', (req, res) => {
    if (userNum === 2) {
        res.json({ok: true});
    } else {
        res.json({wait: true});
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
