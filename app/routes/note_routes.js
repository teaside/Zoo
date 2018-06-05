module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        // const note = {text: req.body.body, title: req.body.title};
        db.createCollection("people", { size: 2147483648 } )
        // });
    });
};

