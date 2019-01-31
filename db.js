var async = require('async');
var fs = require('fs');
var pg = require('pg');

var pool = new pg.Pool(
    {
        user: 'maxroach',
        host: 'localhost',
        database: 'iecse_genesis',
        port: 26257
    }
);

module.exports.fetchUserData = (async function(username, callback) {
    const client = await pool.connect()
    await client.query(`SELECT * FROM users WHERE username = '${username}';`, (err, results) => {
        if (err) {
            console.error("Error fetching rows from table: " + err);
            callback(err);
        }
        else callback(results.rows);
    });
    client.release();
})

module.exports.fetchAllPosts = (async function(callback) {
    const client = await pool.connect()
    await client.query(`SELECT * FROM media;`, (err, results) => {
        if (err) {
            console.error("Error fetching rows from table: " + err);
            callback(err);
        }
        else callback(results.rows);
    });
    client.release();
})
module.exports.fetchPostsByCategory = (async function(category, callback) {
    const client = await pool.connect()
    await client.query(`SELECT * FROM media WHERE category = '${category}';`, (err, results) => {
        if (err) {
            console.error("Error fetching rows from table: " + err);
            callback(err);
        }
        else callback(results.rows);
    });
    client.release();
})

module.exports.addUser = (async function(username, name, email, callback) {
    const client = await pool.connect()
    await client.query(`INSERT INTO users (username, name, email) VALUES('${username}', '${name}', '${email}');`, (err, results) => {
        if (err) {
            console.error("Error Inserting values in table: " + err);
            callback(err);
        }
        else callback(results);
    });
    client.release();
})

module.exports.addPost = (async function(category, href, username, callback) {
    const client = await pool.connect()
    await client.query(`INSERT INTO media (category, href, published_by) VALUES('${category}', '${href}', '${username}');`, (err, results) => {
        if (err) {
            console.error("Error Inserting values in table: " + err);
            callback(err);
        }
        else callback(results);
    });
    client.release();
})

module.exports.makeFavourite = (async function(user_id, post_id, callback) {
    const client = await pool.connect()
    await client.query(`INSERT INTO favourites (user_id, media_id) VALUES('${user_id}', '${post_id}');`, (err, results) => {
        if (err) {
            console.error("Error inserting rows into table: " + err);
            callback(err);
        }
        else callback(results.rows);
    });
    client.release();
})

module.exports.getFavourites = (async function(user_id, callback) {
    const client = await pool.connect()
    await client.query(`SELECT * FROM favourites WHERE user_id = '${user_id}';`, (err, results) => {
        if (err) {
            console.error("Error fetching rows from table: " + err);
            callback(err);
        }
        else callback(results.rows);
    });
    client.release();
})