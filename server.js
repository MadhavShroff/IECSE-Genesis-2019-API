const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/getUserDetails/', (req, res) => {
    console.log("POST: /getUserDetails")
    res.setHeader('Content-Type', 'application/json');
    db.fetchUserData(req.body.username, (result) => {
        res.send(JSON.stringify(result, null, 3));
    })
});

app.get('/getAllUsers', (req, res) => {
    console.log("GET: /getAllUsers")
    res.setHeader('Content-Type', 'application/json');
    db.fetchAllUsers( result => {
        res.send(JSON.stringify(result, null, 3));
    });
});

app.get('/getAllPosts', (req, res) => {
    console.log("GET: /getAllPosts")
    res.setHeader('Content-Type', 'application/json');
    db.fetchAllPosts((result) => {
        res.send(JSON.stringify(result, null, 3));
    })
});

app.get('/getPosts/:category', (req, res) => {
    console.log(`GET: /getPosts/${req.params.category}`)
    res.setHeader('Content-Type', 'application/json');
    db.fetchPostsByCategory(req.params.category, (result) => {
        res.send(JSON.stringify(result, null, 3));
    })
});

app.post('/addUser', (req, res) => {
    console.log("POST: /addUser")
    res.setHeader('Content-Type', 'application/json');
    db.addUser(req.body.username, req.body.name, req.body.email, req.body.best_shot, req.body.profile_pic, (result) => {
        res.send(JSON.stringify(result, null, 3));
    })
});

app.post('/addPost', (req, res) => {
    console.log("POST: /addPost")
    res.setHeader('Content-Type', 'application/json');
    db.addPost(req.body.category, req.body.href, req.body.username, (result) => {
        res.send(JSON.stringify(result, null, 3));
    })
});

app.post('/makeFavourite', (req, res) => {
    console.log("POST: /makeFavourite")
    res.setHeader('Content-Type', 'application/json');
    db.makeFavourite(req.body.user_id, req.body.media_id, (result) => {
        res.send(JSON.stringify(result, null, 3));
    })
});

app.post('/getFavourites', (req, res) => {
    console.log(`GET: /getFavourites`)
    res.setHeader('Content-Type', 'application/json');
    db.getFavourites(req.body.user_id, (result) => {
        res.send(JSON.stringify(result, null, 3));
    })
});

var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
 });