const express = require('express')
const path = require('path');
const cors = require('cors')


const session = require('./utils/session');

const auth_routes = require('./routes/auth')
const user_routes = require('./routes/user')
const home_routes = require('./routes/home')
const account_routes = require('./routes/accounts')

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors())
app.use(express.urlencoded({ 'extended': true }));
app.use(express.json())

app.use(session)

app.use('/', home_routes)
app.use('/auth', auth_routes)
app.use('/user', user_routes)
app.use('/accounts', account_routes)


app.use((req, res, next) => {
    res.status(404).render('error', { session: req.session, error: '404 Not Found' });
});


const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
});