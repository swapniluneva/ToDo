var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());
var Schema = mongoose.Schema;
var Todo = mongoose.model('Todo', new Schema({
	text: String,
	done: Boolean,
}));

app.get('/api/todos', function(req, res){

	Todo.find(function(err, todos){
		if(err)
			res.send(err);

		res.json(todos);
	});
});

app.post('/api/todos', function(req, res){

	Todo.create({
		text: req.body.text,
		
	}, function(err, todo){
		if(err)
			res.send(err);

		Todo.find(function(err, todos){

			if(err)
				res.send(err);

			res.json(todos);
			
		});
	});
	console.log('entry hui hai');
});

app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo){
		if(err)
			res.send(err);

		Todo.find(function(err, todos){
			if(err)
				res.send(err);

			res.json(todos);
		});
	});
});


app.get('*', function(req, res){
	res.sendFile('/public/index.html');
});


app.listen(3000);
console.log("Listening to port 3000");