var config = require('./config.json');
var express = require('express');
var app = express();
app.engine('html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));

var start =  function(req, res, next){
    res.data = {};//data for template
    res.data.title  = 'Widget Factory!';
    return next();
}

var render = function(req, res, next){
    res.render('header.ejs', res.data, function(err, head){
        res.render(res.template, res.data, function(err, body){
            res.render('footer.ejs', res.data, function(err, foot){
                res.send(head+body+foot);
            });
        });
    })
}

app.get('/', start, function(req, res, next){
    res.template = 'index.ejs';
    return next();
}, render);

var widget_fields = ['sku', 'length', 'width', 'height'];
var aa = widget_fields.concat(['weight', 'color']);
var bb = widget_fields.concat(['material', 'expiration_date']);


var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});