/*

* Manages the fields for the different widget types.
* Deals with saving and loading widgets

If this was developed further, it would contain more functions around managing widgets.

It is put in the public directory so if anything was needed on the front end, it would be 
accessible there as a global singleton and the front and back end could share the same
logic.

*/

var widget_factory = {};
if(typeof(exports)!='undefined'){
    //if exports exist then this is running in node.js
    widget_factory = exports;
}

widget_factory.widget_types = ['aa', 'bb'];
widget_factory.get_fields = function(widget_type){
    var widget_fields = ['sku', 'length', 'width', 'height'];
    if(widget_type=='aa'){
	return widget_fields.concat(['weight', 'color']);
    }else{
	return widget_fields.concat(['material', 'expiration_date']);
    }
}

//initalize some config settings. This will be used to set the mongo db collection on server
widget_factory.config = {};
widget_factory.init = function(config){
    for(var key in config){
	widget_factory.config[key] = config[key];
    }
}


widget_factory.save = function(widget, callback){
    var c = widget_factory.config.collection;
    c.insert(widget, function(err, docs){
	if(docs && docs[0]){
	    callback(null, docs[0]);
	}else{
	    callback({err:err, message:'Failed to insert widget'}, null);
	}
    });
}

widget_factory.list = function(query, callback){
    var c = widget_factory.config.collection;
    c.find(query).toArray(callback)
}

