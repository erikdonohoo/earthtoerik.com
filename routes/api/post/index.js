
exports.load = function(app) {
	var mongo = require('mongodb').MongoClient;
	app.get('/api/posts', query(app, mongo));
};

function query(app, mongo) {

	// Get posts
	return function(req, res) {
		mongo.connect(app.get('dbstring'), function(err, db) {
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

			console.log(q);
			post.find(q).toArray(function(err, docs){
				if (err)
					return console.error(err);
				res.json(docs);
			});
		});
	};
}