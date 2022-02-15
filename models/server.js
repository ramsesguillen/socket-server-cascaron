const express = require("express");
const { createServer } = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //* Express server
    this.httpServer = createServer(this.app);

    //* Socket server
    this.io = socketio(this.httpServer, { /* options */ });
  }


  configSockets() {
    new Sockets(this.io);
  }


  middleware() {
    this.app.use( express.static( path.join(__dirname, '../public')) );

    // cors
    this.app.use( cors() );
    // this.app.use( express.static( path.resolve(__dirname + '../public') ) );
  }


  execute() {

    this.middleware();

    this.configSockets();

    this.httpServer.listen( this.port, () => {
      console.log('Server ruing in port:', this.port)
    });
  }

}



module.exports = Server;