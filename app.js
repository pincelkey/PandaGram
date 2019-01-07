let express = require('express'),
    app = express(),
    public = express.static(__dirname + '/public'),
    views = __dirname + '/views',
    router = require('./routes/router'),
    expressMethodOverride = require('express-method-override')('_method')

//setting my app
app
    .set('port', process.env.PORT || 4000)
    .set('view engine','pug')
    .set('views',views)

//middlewares
app
    .use(express.json())
    .use(express.urlencoded({extended:false}))
    .use(expressMethodOverride)
    .use(public)
    .use(router)

module.exports = app;