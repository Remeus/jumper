/* ================== */
/* ||   PRELOAD    || */
/* ================== */
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var sio = require('socket.io'),
    Player = require('./Player').Player;
var io = sio.listen(server);
var UUID = require('node-uuid');
var favicon = require('serve-favicon');

var socket, players;

function init() {
    players = [];
}

init();

server.listen(8080);


/* ================== */
/* ||  GET PAGES   || */
/* ================== */
app.use(express.static(__dirname + '/public'))

.use(favicon(__dirname + '/public/favicon.ico'))

.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
})

.get('/js/*', function(req, res) {
    var file = req.params[0];
    res.sendFile(__dirname + '/js/' + file); 
})

.get('/assets/*', function(req, res) {
    var file = req.params[0];
    res.sendFile(__dirname + '/assets/' + file); 
})

.get('/scripts/*', function(req, res) {
    var file = req.params[0];
    res.sendFile(__dirname + '/scripts/' + file); 
})

.post('/scripts/*', function(req, res) {
    var file = req.params[0];
    res.sendFile(__dirname + '/scripts/' + file); 
})

.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Not found');
});


/* ================== */
/* ||    SOCKET    || */
/* ================== */
io.sockets.on('connection', function(client) {
    
    // UUID
    client.userid = UUID();
    client.emit('onconnected', {id: client.userid});
    console.log(':: SOCKET :: player ' + client.userid + ' connected');
    
    // DISCONNECTION
    client.on('disconnect', function() {
        client.emit('disconnect');
        console.log(':: SOCKET :: player ' + client.userid + ' disconnected');
    });
    
    // NEW PLAYER
    client.on('new player', function(data) {
        console.log(':: SOCKET :: New player');
        var newPlayer = new Player(data.x, data.y); // Get the new player
        newPlayer.id = this.userid;
        this.broadcast.emit('new player', { id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY() }); // Send it to all
        var i, existingPlayer;
        for (i = 0 ; i < players.length ; i++) {
            existingPlayer = players[i];
            this.emit('new player', { id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY() }); // Send all to it
        }
        players.push(newPlayer); // Add the new player to the list of players
    });
    
    // MOVE PLAYER
    client.on('move player', function(data) {
        console.log(':: SOCKET :: Player moves');
    });
    
});

