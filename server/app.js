var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var cors = require('cors')
var jwt = require('jsonwebtoken');


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

                db.collection('animals').find({login: login}).toArray( function (err, result) {
                    if(result.length > 0) {

                        db.collection('animals').find({login: login, password: password}).toArray( function(err, pasresult) {
                            if(pasresult.length > 0) {
                                const token = jwt.sign({pasresult}, 'my_secret_key');
                                console.log('token ', token);
                                res.json({token: token});
                            }
                            else {
                                res.json({token: "Wrong password"});
                            }
                        });
                    }
                    else {
                        res.json({token: "The animal with this login isn't exist"});
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

app.route('/animals')
  .get(ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {

            mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                assert.equal(null, err);
                console.log('getting animals')
                const db = client.db('pets');
        
                db.collection("animals").find().toArray(function(err, results) {
                    if (err) {
                        res.json({'animals': "db don't has animals "});
                    } else {
                        res.json(results);
                    }
                  });
            });
            
        }
    })
    
  })
  .post(ensureToken, function(req, res) {
        try {
            jwt.verify(req.token, 'my_secret_key', (err, data) => {
                if (err) {
                    res.sendStatus(403);
                } else {
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
                                    '_id': req.body.id,
                                    'name': req.body.name,
                                    'login': req.body.login,
                                    'password': req.body.password,
                            },
                            function (err, r) {
                                assert.equal(null, err);
                                res.send("Document inserted with _id: " + r.insertedId);
                            }
                            );
                        });
                        
                    }
                }
            })
         
  }
  catch(err) {
      console.log(err);
  }
  })


app.route('/animals/:id')
    .get(ensureToken, (req, res) => {
        jwt.verify(req.token, 'my_secret_key', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
         mongoClient.connect('mongodb://localhost:27017', function(err, client) {
            assert.equal(null, err);
    
            const db = client.db('pets');
    
            db.collection("animals").find({'_id' : req.params.id}).toArray(function(err, results) {
                if (err) {
                } else {
                    console.log("aniamal by id ", results);
                    res.json(results);
                }
              });
        });
        
            }
        })
       
    })
    .put(ensureToken, (req, res) => {
        try{
            jwt.verify(req.token, 'my_secret_key', (err, data) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    if(typeof req.body == 'undefined') {
                        next(Error('Please enter the data'));
                    }

                    mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                        assert.equal(null, err);
                        console.log('Connected to mongodb')
                
                        const db = client.db('pets');
                        db.collection("animals").updateOne(
                            {_id: req.body.id}, 
                            { $set: 
                                {
                                    name: req.body.name, 
                                    login: req.body.login,
                                    password: req.body.password
                                }
                            }, function(err, result){      
                                    console.log(result);
                                    res.json(result);
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
                            {_id: req.params.id}, 
                            function(err, result){      
                                    console.log(result.result);
                                    res.json(result);
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