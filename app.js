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
    dx: undefined,
    dz: undefined,
    type: 'alive',
};
let player2 = {
    dx: undefined,
    dz: undefined,
    type: 'alive',
};

app.get('/connect', (req, res) => {
    userNum++;
    res.json({
        player: userNum,
    });
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
        if (req.body.type == 'loss') {
            player1.type = 'loss';
        } else {
            player1.dx = req.body['playerData[dx]'];
            player1.dz = req.body['playerData[dz]'];
        }

        res.send('ok');
    } else {
        if (req.body.type == 'loss') {
            player2.type = 'loss';
        } else {
            player2.dx = req.body['playerData[dx]'];
            player2.dz = req.body['playerData[dz]'];
        }
        res.send('ok');
    }
    console.log(player1);
    console.log(player2);
});

app.get('/listen', (req, res) => {
    if (userNum === 2) {
        res.json({
            ok: true,
        });
    } else {
        res.json({
            wait: true,
        });
    }
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
