exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.send({ sucess: false, msg: 'Access denied! Please log in!' });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.send({ sucess: false, msg: 'Access denied! Please log in!' });
    }

    if (!(req.session.passport.user.role === 'admin')) {
        return res.send({ sucess: false, msg: 'Access denied! Only for admins!' })
    }
    next();
}