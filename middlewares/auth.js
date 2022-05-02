const jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1]
        const user = jwt.verify(token, 'hello123').user
        req.verifyUser = user;
    }
    catch(error){
        console.log(error);
    }
    finally 
    { 
        next(); 
    }

}


module.exports = { authenticate }