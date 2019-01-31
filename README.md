# IECSE-Genesis-2019-API

Initialize a cockroach cluster first, create a database called iecse_genesis, and a user called maxroach, and grant all privilages(INSERT, CREATE, SELECT) to that user. ip and port can be edited in ```dj.js``` and in ```db-init.js```

Then run ```node db-init.js``` to create the tables

Then start the server with ```node server.js```

endpoints : 

/getUserDetails
/getAllPosts
/getPosts/:category
/addUser
/addPost
/makeFavourite
/getFavourites
