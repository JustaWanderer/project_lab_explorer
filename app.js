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
};
let player2 = {
    dx: undefined,
    dz: undefined,
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
        player1.dx = req.body['playerData[dx]'];
        player1.dz = req.body['playerData[dz]'];
        res.send('ok');
    } else {
        player2.dx = req.body['playerData[dx]'];
        player2.dz = req.body['playerData[dz]'];
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

app.get('/reset', (req, res) => {
    userNum = 0;
    player1 = {
        dx: undefined,
        dz: undefined,
    };
    player2 = {
        dx: undefined,
        dz: undefined,
    };
    res.send('ok');
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
