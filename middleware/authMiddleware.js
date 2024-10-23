// middleware is after user login, allow the user to add post
const protect = (req, res, next) => {
    // de-construct the user from the session
    const {user} = req.session;

    if(!user){
        return res.status(401).json({
            status: 'fail',
            message: 'unauthorized'
        })
    }

    req.user = user;

    next();
};

module.exports = protect;