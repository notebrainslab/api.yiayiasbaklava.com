const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

const verifyCallback = (req, res, resolve, reject) => {
    return async (err, user, info) => {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        req.user = user;       // Store full user object
        req.userId = user.id;
        resolve();
    };
};

const auth = () => {
    return async (req, res, next) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false }, 
                verifyCallback(req, resolve, reject)
            )(req, res, next);
        })
        .then(() => next())
        .catch((err) => next(err));
    };
};


// const auth = () => {
//     return async (req, res, next) => {
//         passport.authenticate('jwt', { session: false }, (err, user) => {
//             if (err || !user) {
//                 return res.status(401).json({ message: 'Unauthorized' });
//             }
            
//             req.userId = user.id;
                    
//             next();
//         })(req, res, next);
//     };
// };

module.exports = auth;
