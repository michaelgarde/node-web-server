const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Heroku compatibility
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
// Serve the public folder (ex. http://localhost:3000/help.html)
app.set('View engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toISOString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance mode',
//         message: "We'll be right back!"
//     })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(text);
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: "Michael",
    //     likes: ["asdf", "asdf"]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Hello!"
    })
});

app.get('/about', (req, res) => {
    // res.send('About page')
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Argh!",
    })
})


app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));