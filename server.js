const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const{User, Playlists, Songs, Artist, Albums, Library, Search } = require(`./models`);

const routes = require('./controllers');
const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};


app.use(session(sess));

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// TODO:For Joseph developing purposes. To remove after development
require(`./develop/routes/apiRouting`)(app);
require(`./develop/routes/htmlRouting`)(app);
// ---------------------------------------------------------


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port 3001!'));
});

