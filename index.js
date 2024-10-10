// Import modules
const express = require('express');
//const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
//const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const pagesController = require('./controllers/pagesController');
const homeController = require('./controllers/home');
const validateMiddleware = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const flash = require('connect-flash');



// const customMiddleware = (req, res, next) => {
//     console.log('Custom middleware called');
//     next();
// };



mongoose.connect('mongodb://0.0.0.0:27017/blog_db', { useNewUrlParser: true });

// Initialize express
const app = new express();

// Express Session middleware
app.use(expressSession({
    secret: 'keyboard cat'
}))

// Set templating engine
app.set('view engine', 'ejs');

// Serves static files from public folder
app.use(express.static('public'));

// Middleware
app.use(express.json())
app.use(express.urlencoded())

app.use(fileUpload());

app.use(flash());

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

//app.use(customMiddleware);
app.use('/posts/store', validateMiddleware);

// Route handling for each route
app.get('/', homeController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/about', pagesController.about);

app.get('/contact', pagesController.contact);

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController);

app.get('/auth/logout', logoutController);

app.use((req, res) => res.render('notfound'));

// Set port to listen on
app.listen(4000, () => {
    console.log('App listening on port 4000')
})