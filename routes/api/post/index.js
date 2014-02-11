
exports.load = function(app) {
	var mongo = require('mongodb');
	app.get('/api/posts', query(app, mongo));
	app.get('/api/posts/:id', get(app, mongo));
};

function query(app, mongo) {

	// Get posts
	return function(req, res) {
		mongo.MongoClient.connect(app.get('dbstring'), function(err, db) {
			var post = db.collection('post');
			var q = {};

			// tags
			if (req.query.tag)
				q.tags = {'$in' : [req.query.tag]};

			// Created after
			if (req.query.startDate) {
				q.date = q.date ? q.date : {};
				q.date['$gte'] = parseInt(req.query.startDate);
			}

			// Created before
			if (req.query.endDate) {
				q.date = q.date ? q.date : {};
				q.date['$lte'] = parseInt(req.query.endDate);
			}

			post.find(q).sort({'date':-1}).toArray(function(err, docs){
				if (err)
					return console.error(err);

				res.json(docs);
			});
		});
	};
}

function get(app, mongo) {
	// Get post
	return function(req, res) {
		mongo.MongoClient.connect(app.get('dbstring'), function(err, db){
			var post = db.collection('post');
			post.findOne({_id: new mongo.BSONPure.ObjectID(req.params.id)}, function(err, item){
				res.json(item);
			});
		});
	};
}