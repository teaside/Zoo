var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var cors = require('cors')
var jwt = require('jsonwebtoken');
const {ObjectId} = require('mongodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors());

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });
}

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.post('/login', (req, res) => {
    try {
        if(typeof req.body == 'undefined') {
            next(Error('Please enter the data'));
        }
        else {
            console.log('auth....');
            const login = req.body.login;
            const password = req.body.password;

            mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                assert.equal(null, err);
                const db = client.db('pets');

                db.collection('users').find({login: login}).toArray( function (err, result) {
                    if(result.length > 0) {

                        db.collection('users').find({login: login, password: password}).toArray( function(err, pasresult) {
                            if(pasresult.length > 0) {
                                console.log(pasresult);
                                const token = jwt.sign({pasresult}, 'my_secret_key');
                                console.log('token ', token);
                                res.json({token: token, userId: result[0]._id});
                            }
                            else {
                                res.json({token: "Wrong password"});
                            }
                        });
                    }
                    else {
                        res.json({token: "The user with this login isn't exist"});
                    }
                });
            });
            
        }
    }
catch(err) {
  console.log(err);
}
});

app.get('/', ensureToken, function  (req, res) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'protected hello',
                data: data
            });
        }
    })
});

app.get('/email/:email', function  (req, res) {
    mongoClient.connect('mongodb://localhost:27017', function(err, client) {
        assert.equal(null, err);
        console.log('checking email')
        const db = client.db('pets');

        db.collection("users").find({email: req.params.email}).toArray(function(err, results) {
            if (err) {
                console.log(err);
                res.json({'users': ""});
            } else {
                console.log(results.length);
                if(results.length>0)
                    res.json(true)
                else res.json(false);
            }
          });
    });
});

app.route('/user')
  .get(ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                assert.equal(null, err);
                console.log('getting users')
                const db = client.db('pets');
        
                db.collection("users").find().toArray(function(err, results) {
                    if (err) {
                        res.json({'users': "db don't has users "});
                    } else {
                        res.json(results);
                    }
                  });
            });
            
        }
    })
    
  })
  .post(function(req, res) {
        try {
            console.log("post user");
            if(typeof req.body == 'undefined') {
                next(Error('Please enter the data'));
            }
            else {
                mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                    assert.equal(null, err);
                    const db = client.db('pets');
                    db.collection('users').insertOne(
                        { 
                            'email': req.body.login,
                            'name': req.body.name,
                            'password': req.body.password,
                            'animals': []
                    },
                    function (err, r) {
                        assert.equal(null, err);
                        res.send("Document inserted with _id: " + r.insertedId);
                    }
                    );
                });
                
            }
         
  }
  catch(err) {
      console.log(err);
  }
  })


app.route('/:userId/animals')
  .get(ensureToken, (req, res) => {
    console.log('getting animals for user');
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {

            mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                assert.equal(null, err);
                
                // console.log(req.params.login);
                const db = client.db('pets');
        
                db.collection("animals").find({userId: req.params.userId}).toArray(function(err, results) {
                    if (err) {
                        res.json([{'animals': "db don't has animals "}]);
                    } else {
                        console.log(results);
                        res.json(results);
                    }
                  });
            });
            
        }
    })
    
  })
  .post(function(req, res) {
    console.log("req.body.name",req.body);
        try {
                    console.log("post animals");
                    if(typeof req.body == 'undefined') {
                        next(Error('Please enter the data'));
                    }
                    else {
                        mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                            assert.equal(null, err);
                            const db = client.db('pets');
                            db.collection('animals').insertOne(
                                { 
                                    'name': req.body.name,
                                    'userId': req.params.userId
                            },
                            function (err, r) {
                                assert.equal(null, err);
                                res.send("Document inserted with _id: " + r.insertedId);
                            }
                            );
                        });
                    }
         
  }
  catch(err) {
      console.log(err);
  }
  })


  app.get('/animal/:id/:userId', ensureToken, function  (req, res) {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                assert.equal(null, err);
            console.log("animal id ", req.params.id);
            console.log("user id ", req.params.userId);
                const db = client.db('pets');          
                db.collection("animals").find({_id: ObjectId(req.params.id), userId: req.params.userId}).toArray(function(err, results) {
                    if (err) {
                    } else {
                        console.log(results[0]);
                        res.json(results[0]);
                    }
                });
            });
        }
    })
});

app.route('/animals/:id')
    .get(ensureToken, (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                    assert.equal(null, err);
                console.log(req.params.id);
                    const db = client.db('pets');          
                    db.collection("animals").find({_id: ObjectId(req.params.id)}).toArray(function(err, results) {
                        if (err) {
                        } else {
                            console.log(results[0]);
                            res.json(results[0]);
                        }
                    });
                });
            }
        })
    })

    .put(ensureToken, (req, res) => {
        try {
            jwt.verify(req.token, 'my_secret_key', (err, data) => {
                if (err) {
                    res.sendStatus(403);
                } 
                else {
                    if(typeof req.body == 'undefined') {
                        next(Error('Please enter the data'));
                    }

                    mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                        assert.equal(null, err);
                        console.log('Connected to mongodb')
                        // console.log(req.body._id);
                        const db = client.db('pets');
                        db.collection("animals").updateOne(
                            { _id: ObjectId(req.params.id)},
                            { $set: 
                                { name: req.body.name }
                            }, function(err, result){   
                                if(err != null)
                                {
                                    console.log(err);
                                    res.status(500);
                                }   
                                else {
                                    console.log(result);
                                    res.json(result);
                                }
                                
                            }

                        )
                    });
                    
                }
            })
            
        }
        catch(err) {
            console.log(err);
        }
    })
    .delete(ensureToken, (req, res) => {
        try{
            jwt.verify(req.token, 'my_secret_key', (err, data) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    if(typeof req.body == 'undefined') {
                        next(Error('Please enter the data'));
                    }
        
                    console.log('animals id: ', req.params.id);
                    mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                    
                        assert.equal(null, err);
                        const db = client.db('pets');
                        db.collection("animals").deleteOne(
                            {_id: ObjectId(req.params.id)}, 
                            function(err, result){  
                                if(err != null)
                                {
                                    console.log(err);
                                    res.status(500);
                                }   
                                else {
                                    console.log(result.result);
                                    res.json(result);
                                }    
                            }
                        )
                    });
                    
                }
            })
            
        }
        catch(err) {
            console.log(err);
        }
    })
    


app.use(errorHandler);

process.on('unchaughtException', (err) => console.log('piy', err))

app.listen(3000);
console.log('Express listening on port 3000');