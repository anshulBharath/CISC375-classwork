let path = require('path');
let http = require('http');
let express = require('express');
let webSocket = require('ws');

let port = 8000;
let public_dir = path.join(__dirname, 'public');

let app = express();
app.use(express.static(public_dir));

let server = http.createServer(app);

let wss = new webSocket.Server({server});
let clients = {};

wss.on('connection', (ws) => {
    let id = ws._socket.remoteAddress + ':' + ws._socket.remotePort;
    console.log('Got new connection: ' + id);
    clients[id] = ws;
    ws.on('message', (data) => {
        //console.log('new message: ' + data.toString());
        let client_id;
        for(client_id in clients) {
            clients[client_id].send(data.toString());
        }
    });
    ws.on('close', () => {
        delete client[id];
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log('Now listening on port ' + port);
});