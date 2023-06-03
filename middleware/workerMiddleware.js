const jwt = require('jsonwebtoken');

const requireAdminAuth = (req, res, next) => {
    const token = req.cookies.jwtw;

    if (token) {
        jwt.verify(token, 'e alo bidibao radnik', (err, decoded_token) => {
            if (err) {
                //console.log(err);
                res.redirect('/admin');
            } else {
                //console.log(decoded_token);
                next();
            }
        })
    } else {
        res.redirect('/admin');
    }
}

const isAdmin = (req, res, next) => {
    const token = req.cookies.jwtw;

    if (token) {
        jwt.verify(token, 'e alo bidibao radnik', (err, decoded_token) => {
            if (err) {
                return
            } else {
                res.redirect('/panel');
                next();
            }
        })
    } else {
        return
    }
}




// const checkAdmin = (req, res, next) => {
//     const token = req.cookies.jwt;

//     if (token) {
//         jwt.verify(token, 'e alo bidibao admin', async (err, decoded_token) => {
//             if (err) {
//                 console.log(err);
//                 res.locals.admin = null;
//                 next();
//             } else {
//                 console.log(decoded_token);
//                 let admin = await Admin.findById(decoded_token.id);
//                 res.cookie('id', decoded_token.id);
//                 res.locals.customer = admin;
//                 next();
//             } 
//         })
//     } else {
//         res.locals.admin = null;
//         next();
//     }
// }



module.exports = { requireAdminAuth, isAdmin }