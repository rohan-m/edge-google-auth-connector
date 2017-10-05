/**
 * Created by rmahalank on 7/5/17.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", function (req, res, next) {
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        tokens.project_id = key.projectId;
        res.send(tokens);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
//start

var google = require('googleapis');

var scopes = [
    'https://www.googleapis.com/auth/logging.write'
];

var key = require('./config.json');
var jwtClient = new google.auth.JWT(
    key.serviceAccountEmail,
    null,
    key.privateKey,
    scopes,
    null
);



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});