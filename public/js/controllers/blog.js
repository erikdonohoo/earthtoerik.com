angular.module('ed.web').controller('BlogCtrl', ['$scope','Nav','$routeParams','Post',
	function($scope, Nav, $params, Post){

	Nav.open = false;
	var year = [],
		now = new Date();

	// Build Archive quick links
	for (var i = 0; i < 12; i++) {
		var month = {};
		month.start = new Date(now.getFullYear(), now.getMonth() - i, 1).getTime();
		month.end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0).getTime();
		year.push(month);
	}

	function searchPosts(params) {
		$scope.posts = [];
		Post.query(params, function(posts){
			$scope.posts = posts;
		});
	}

	$scope.postsLoading = function() {
		return !$scope.posts || $scope.posts.length === 0;
	};

	searchPosts($params || {});

	$scope.year = year;
}]);