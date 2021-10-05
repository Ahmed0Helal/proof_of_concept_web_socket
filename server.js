const app = require('express')();

const server = require('http').Server(app);

const io = require('socket.io')(server,{
    allowEIO3: true // false by default this fix issue unsupported protocol
});

const Redis = require('ioredis');
const redis = new Redis({
    port: 6379,
    host: "127.0.0.1",
    family: 4,
    password: null,
    db: 0,
});

// Listen to laravel backend events
redis.subscribe('laravel_database_payment-channel');


redis.on('message', function (channel, message) {
    message = JSON.parse(message);
    console.log(message,channel);
    // 'laravel_database_payment-channel:App\\Events\\PaymentSuccess'+'100'+'3'
    // (laravel_database_payment-channel:orderId:userId) => will sent from backend to clients
    // Fire message to all joined clients
    io.emit('test', message.data);
});


io.on('connection', function (socket) {
    console.log('User joined')
    socket.on('disconnect', function () {
        console.log('User left');
    });
});


server.listen(3000);

app.get('/',function(request, response){
    response.sendFile(__dirname + '/index.html');
});
