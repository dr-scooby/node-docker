// environment variables for the container
// pay attention to the MONGO_IP "mongodb01" - it's taken from the docker-compose.yml
module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongodb01",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    REDIS_URL: process.env.REDIS_URL || 'redis://redis:6379',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET,
}