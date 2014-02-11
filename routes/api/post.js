// Get posts
exports.query = function(req, res) {

	console.log(req.query);
	var posts = [];
	for (var i = 0; i < 10; i++) {
		var post = {};
		post.title = 'Post ' + i;
		post.text = "ANOTHER COOL POST";
		post.date = new Date().getTime();
		posts.push(post);
	}
	res.json(posts);
};