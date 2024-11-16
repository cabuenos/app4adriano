const authMiddleware = require('../utils/authMiddleware');

const Router = require('express').Router;
const router = Router();

const users = [
    {
        id: '000',
        username: "admin",
        password: "admin"
    },
    {
        id: '001',
        username: "carlos",
        password: "carlos"
    },
    {
        id: '002',
        username: "pepe",
        password: "pepe"
    }
];

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.render('login')
    }
    // res.render('home', { session: req.session });
});


router.post('/login', (req, res) => {

    const { username, password } = req.body

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (!user) {
        res.render('login', { error: "wrong creds" })
    } else {
        // create session
        req.session.user = {
            id: user.id,
            name: user.username
        };

        res.redirect('/');
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('no se pudo eliminar sesion');
            res.send(false);
        } else {
            res.redirect('/');
            // res.redirect('/auth/login');
        }
    });
});


module.exports = router;