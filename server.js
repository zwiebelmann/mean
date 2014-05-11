var express = require('express'),
    bodyParser =require('body-parser'),
    morgan = require('morgan'),
    stylus = require('stylus');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(src, path) {
    return stylus(src).set('filename', path);
}

if('development' === env) {
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'jade');

    app.use(morgan());
    app.use(bodyParser());

    app.use(stylus.middleware(
        {
            src: __dirname + '/public',
            compile: compile
        }
    ));

    app.use(express.static(__dirname + '/public'));
}

//app.configure(function() {
//    app.set('views', __dirname + '/server/views');
//    app.set('view engine', 'jade');
//});

app.get('*', function(req, res) {
    res.render('index');
});
var port = 3030;
app.listen(port);

console.log('Listening on port ' + port + '...');