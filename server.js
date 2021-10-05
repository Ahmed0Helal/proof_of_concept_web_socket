const app = require('express')();

const cors = require('cors');
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*',
    credentials: false
}));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const server = require('http').Server(app);

const io = require('socket.io')(server,  { cors: { origin: '*' } });

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
