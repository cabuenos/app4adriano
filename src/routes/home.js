const Router = require('express').Router;
const authMiddleware = require('../utils/authMiddleware');

const router = Router();

router.get('/', authMiddleware, (req, res) => {

    res.render('home', { session: req.session })
    // res.render('login.ejs', { user: req.session.user })
});


module.exports = router;