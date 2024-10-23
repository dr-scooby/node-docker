const User = require("../models/userModel");
// import the encryption bcryptjs
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    // grab the info from the body
    const {username, password, email} = req.body;
    

    try{
        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashpassword,
            email
        });
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
        console.log("new user signup", newUser);
        // can login user to session, after successfull signup
        // req.session.user = user;
    }catch(e){
        res.status(400).json({
            status: 'fail'
        })
    }
};

exports.login = async (req, res) => {
    // get the data from client
    const {username, password} = req.body;

    try{
        // check in DB if user exists
        const user = await User.findOne({username});

        // if user doesn't exist, send fail message
        if(!user){
            console.log("incorrect user ", username);
            
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }

        const iscorrect =  await bcrypt.compare(password,user.password);
        if(iscorrect){
            req.session.user = user;
            res.status(200).json({
                status: 'success'                
            })
        }else{
            return res.status(400).json({
                status: 'fail',
                message: 'incorrect password'
            })
        }
        
    }catch(e){
        res.status(400).json({
            status: 'fail'
        })
    }
};