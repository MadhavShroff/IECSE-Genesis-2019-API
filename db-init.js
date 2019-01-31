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

(async function(){
    const client = await pool.connect()
    await client.query('CREATE TABLE IF NOT EXISTS users(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), username varchar(255), name varchar(255), email varchar(255));', (err, res) => {
        if (err) {
            console.error("Error creating table: " + err);
        }
        console.log(res)
    });
    await client.query('CREATE TABLE IF NOT EXISTS media(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), category varchar(100), href varchar(500), published_by varchar(100));', (err, res) => {
        if (err) {
            console.error("Error creating table: " + err);
        }
        console.log(res)
    });
    await client.query('CREATE TABLE IF NOT EXISTS favourites(user_id UUID, media_id UUID);', (err, res) => {
        if (err) {
            console.error("Error creating table: " + err);
        }
        console.log(res)
    });
    client.release()
})()