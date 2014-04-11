var config = require('./config.json');
var express = require('express');
var app = express();
app.engine('html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
var widget_factory = require(__dirname + '/public/widget_factory.js');
/*
  widget factory is in public directory so it can be used by node and client
  This isn't used on the front end in this project, but I could see the module being
  used for validation and other things on the front end if this was a fleshed out project
*/
var bodyParser = require('body-parser');
app.use(bodyParser());

//all requests will hit this first before processing the request
var start =  function(req, res, next){
    res.data = {};//data for template
    res.data.widget_factory = widget_factory;
    return next();
}

/*
  This is the final step in all requests. It assembles the head, body and footer and sends 
  them to the client.
*/
var render = function(req, res, next){
    res.render('header.ejs', res.data, function(err, head){
        res.render(res.template, res.data, function(err, body){
            res.render('footer.ejs', res.data, function(err, foot){
                res.send(head+body+foot);
            });
        });
    })
}

//homepage
app.get('/', start, function(req, res, next){
    res.data.title = 'Home';
    res.template = 'index.ejs';
    return next();
}, render);


app.get('/create', start, function(req, res, next){
    res.data.title = 'Create A Widget';
    res.template = 'create.ejs';
    if(req.query && req.query.widget_type){
	res.data.widget_type = req.query.widget_type;
    }

    return next();
}, render);

app.post('/create', start, function(req, res, next){
    widget_factory.save(req.body, function(err, widget){
	if(err){
	    //break the flow ... not going to next
	    return res.send('There was an error with the widget submission: '+ err.message);
	}else{
	    res.data.title = 'Widget Created!';
	    res.template = 'created.ejs';
	    if(req.query && req.query.widget_type){
		res.data.widget_type = req.query.widget_type;
	    }
	    return next();
	}
    });
}, render);

app.get('/list', start, function(req, res, next){
    res.data.title = 'Widget List';
    res.template = 'list.ejs';
    var query = {};
    if(req.query && req.query.widget_type){
	res.data.widget_type = req.query.widget_type;
	var query = {widget_type:req.query.widget_type}
    }
    widget_factory.list(query, function(err, widgets){
	res.data.widgets = widgets;
	return next();
    });
}, render);


//Connect to the database
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/widget_factory', function(err, db) {
    if(err) throw err;

    //give a pointer to the collection that the widget factory will be working with
    var widgets = db.collection('widget');
    widget_factory.init({collection:widgets});
    
    //Startup server... we only want this to happen when db is already connected
    // hence why it is in the Mongo connect callback
    var server = app.listen(config.port, function() {
	console.log('Listening on port %d', server.address().port);
    });

})
