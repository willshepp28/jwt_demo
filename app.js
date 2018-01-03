const express = require('express'),
    jwt = require('jsonwebtoken'),
    application = express();




application.get('/api', ( request, response) => {
    response.json({ message: 'this is the api'});
})



application.post('/api/login', (request, response) => {

    // fake user
    const user = { id: 3 };

    const token = jwt.sign({ user }, 'my_secret_key');
    response.json({ token: token})
});


application.get('/api/protected', ensureToken, (request, response) => {

    jwt.verify(request.token, 'my_secret_key', ( err, data) => {
        if (err) {
            respones.sendStatus(403);
        } else {
            response.json({ 
                message: 'this is protected',
                data: data
            });
        }
    })
    response.json({ message: 'this is a protected route'});
});


function ensureToken(request, response, next){
    const bearerHeader = request.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    } else {
        response.sendStatus(403);
    }
}


application.listen(3000, () => {
    console.log('App listening on port 3000');
});