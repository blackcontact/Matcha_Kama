const CONFIG = require('./config/Config');
var userModel = require('./models/userModel');
var messageModel = require('./models/messageModel');
var jwtAuth = require('socketio-jwt-auth');

var likeModel = require('./models/likeModel');
// var messageModel = require('./models/messageModel');

var io_init = (function(io, connectedUsers) {
  io.use(jwtAuth.authenticate({
    secret: CONFIG.API_SECRET_JWT_KEY,
    algorithm: 'HS256'
  }, async function(payload, done) {
    try {
      const id = payload.id;
      const rawUser = await userModel.getOneById({id});
      if (!rawUser[0])
        return done(null, false, 'user does not exist');
      const username = rawUser[0].username;
      return done(null, {username, id});
    } catch (err) {
      return done(err);
    }
  }));

  io.on('connection', function(socket) {
    console.log('hello ' + socket.id);
    if (!connectedUsers[socket.request.user.id]) {
      connectedUsers[socket.request.user.id] = {
        username: socket.request.user.username,
        socket: []
      };
    }
    connectedUsers[socket.request.user.id].socket.push(socket.id);
    socket.join(socket.request.user.id);
    socket.emit('success', {
      message: 'success logged in!'
    });
    socket.on('message', async function(data) { //TODO: Verif block + incomplete
      console.log(data);
      if (!data.dest || !data.message)
        return ;
      console.log('Message received!');
      let res = await likeModel.matchChecker(socket.request.user.id, data.dest);
      if (!res.length)
        return ;
      io.in(res[0].user_id).emit('message', {
        from: socket.request.user.id,
        timestamp: Date.now(),
        message: data.message
      });
      await messageModel.createNewMessage(res[0].user_id, socket.request.user.id, data.message);
    });
    socket.on('disconnect', (reason) => {
      console.log('goodbye ' + socket.id + ' - Reason: ' + reason);
      const index = connectedUsers[socket.request.user.id].socket.indexOf(socket.id);
      if (index !== -1)
        connectedUsers[socket.request.user.id].socket.splice(index, 1);
      if (connectedUsers[socket.request.user.id].socket.length == 0)
        delete connectedUsers[socket.request.user.id];
    });
  });
});

module.exports = {io_init};