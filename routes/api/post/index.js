
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

			post.find(q).toArray(function(err, docs){
				if (err)
					return console.error(err);
				res.json(docs);
			});
		});
	};
}