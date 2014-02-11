angular.module('ed.web').controller('BlogCtrl', ['$scope','Nav','$routeParams','Post',
	function($scope, Nav, $params, Post){

	Nav.open = false;
	var year = [],
		now = new Date(),
		posts = [];

	// Build Archive quick links
	for (var i = 0; i < 12; i++) {
		var month = {};
		month.start = new Date(now.getFullYear(), now.getMonth() - i, 1).getTime();
		month.end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0).getTime();
		year.push(month);
	}

	function searchPosts(params) {
		posts = Post.query(params);
	}

	searchPosts($params || {});

	$scope.year = year;
	$scope.posts = posts;
}]);