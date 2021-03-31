const loggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
        res.redirect('/library');
    } else {
        next();
    };
};

module.exports = loggedIn;