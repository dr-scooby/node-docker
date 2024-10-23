const express = require("express");
const redis = require('redis');
// Using Node.js `require()`
const mongoose = require('mongoose');
const RedisStore = require('connect-redis').default;
const session = require('express-session');
const cors = require("cors");


//let RedisStore = require("connect-redis")(session);

// get the configs
const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_IP, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

// init the Redis Client
let redisClient = redis.createClient({
    //host: REDIS_URL,
    //port: REDIS_PORT
    url: 'redis://redis:6379'
});
let redisStore = new RedisStore({client: redisClient});

// catch any errors with Redis Client
redisClient.on('error', (err)=>{
    console.log('Redis Client error', err);
})

redisClient.connect().then(() => {
    console.log('connected to Redis');
})

// wire the routes
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// get environment variables from config.js
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?directConnection=true&authSource=admin`;

const connectWithRetry = () =>{
    mongoose.connect(mongoURL)
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => { 
        console.log(e)
        // if it doesn't connect, try to connect again, wait 5 secs, not a good implementation
        setTimeout(connectWithRetry, 5000)  
    });
}

connectWithRetry();

app.use(cors({}));
// use redis
app.use(session({
    store: redisStore,
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 50000
    }
}))

// need to use the json
app.use(express.json());

app.get("/api/v1", (req, res) => {
    res.send("<h1>Node Web App</h1><h2>Hi Dr. Jahangir Ismail, punk</h2>");
    console.log("it ran");
} );


// end point: localhost:3000/api/v1/posts/
app.use("/api/v1/posts", postRouter);
// end point: localhost:3000/api/v1/users/
app.use("/api/v1/users", userRouter);

const port = process.env.port || 3000;

app.listen(port, () => console.log(`listening on ${port}`))