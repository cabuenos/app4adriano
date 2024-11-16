const authMiddleware = require('../utils/authMiddleware');

const Router = require('express').Router;

const router = Router();

router.get('/', authMiddleware, (req, res) => {

    const newUser = req.session?.newUser

    req.session.newUser = null;

    res.render('accounts', { session: req.session, newUser })
});


router.post('/create', authMiddleware, (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            position,
            area,
            business_unit,
            client,
            outputs = null,
        } = req.body;

        newUser = {
            first_name,
            last_name,
            email,
            position,
            area,
            business_unit,
            client,
            outputs
        }
        req.session.newUser = newUser;
        res.status(200).redirect('/accounts');
    } catch (error) {
        console.error('algo salio mal al crear el usuario');

    }
});


module.exports = router;