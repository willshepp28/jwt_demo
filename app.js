const express = require('express'),
    application = express();




application.get('/api', ( request, response) => {
    response.json({ message: 'this is the api'});
})



application.listen(3000, () => {
    console.log('App listening on port 3000');
});