

// Declare app level module which depends on filters, and services
angular.module('ed.web', ['ngRoute','ngResource','ngTouch','ngAnimate']).
  config(['$locationProvider','$routeProvider', function($locationProvider,$route) {
	$route.when('/blog',{
		templateUrl:'partials/blog',
		controller:'BlogCtrl'
	})
	.when('/blog/:blogid',{
		templateUrl:'partials/post',
		controller:'PostCtrl'
	})
	.when('/',{
		templateUrl:'partials/home',
		controller:function($scope, Nav){
			Nav.open = false;
		}
	}).otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}])

// Logo Directive
.directive('edLogo', [function(){
	var dir = {};
	dir.restrict = 'E';
	dir.template = '<div ng-style="style" class="logo">{<span>e</span>}</div>';
	dir.scope = {
		size:'@?'
	};
	dir.link = function(scope) {
		scope.style = {};
		if (scope.size)
			scope.style['font-size'] = scope.size + 'px';
	};

	return dir;
}])

.directive('edShowWindow',['$window',function($window){
	var dir = {};
	dir.scope = {
		edShowWindow: '@'
	};
	dir.link = function(scope, elem) {

		scope.getPageWidth = function() {
			return $window.innerWidth;
		};

		$window.onresize = function() {
			scope.$apply(); // Tell angular about window size change
		};

		scope.$watch(scope.getPageWidth, function(newVal){
			if (newVal > scope.edShowWindow)
				elem.addClass('show-force');
			else
				elem.removeClass('show-force');
		});
	};
	return dir;
}])

.directive('edLoad', ['$parse', function($parse){
	var dir = {};
	dir.restrict = 'E';
	dir.scope = {
		condition: '&'
	};
	dir.replace = true;
	dir.template = '<div class="loading" ng-show="expr"><i class="fa fa-spinner fa-spin fa-4x"></i><div>loading</div></div>';
	dir.link = function(scope) {
		scope.expr = scope.condition();
		scope.$watch('condition()', function(){
			scope.expr = scope.condition();
		});
	};
	return dir;
}])

.directive('edScroll', ['$window','$location','$anchorScroll', function($window,$location,$anchorScroll){
	var dir = {};
	dir.scope = {
		edScroll: '@'
	};
	dir.replace = true;
	dir.template = '<div class="ed-scroll ng-hide" ng-click="top()"><i class="fa fa-arrow-up fa-2x"></i></div>';
	dir.link = function(scope, elem) {

		scope.getScroll = function() {
			return $window.scrollY;
		};

		$window.onscroll = function() {
			scope.$apply(); // Tell angular about scrolling
		};

		scope.top = function() {
			$location.hash();
			$anchorScroll();
		};

		scope.$watch(scope.getScroll, function(newVal){
			if (newVal > scope.edScroll)
				elem.removeClass('ng-hide');
			else
				elem.addClass('ng-hide');
		});
	};

	return dir;
}])

.directive('edCode',['$timeout', function($timeout){
	var dir = {};
	dir.scope = {
		plunk: '@'
	};
	dir.restrict = 'E';
	dir.template = '<div class="ed-code clearfix"><pre class="prettyprint"></pre><a ng-href="{{plunk}}" target="_blank"><i class="code-link fa fa-toggle-down fa-2x" title="Try in Plnkr"></i></a></div>';
	dir.transclude = true;
	dir.link = function(scope, elem, attr, ctrl, transclude) {
		var code = angular.element('<div>').append(transclude());
		code = code.html().indexOf('<span class="ng-scope">') != -1 ? code.find('span').html() : code.html();
		elem.find('pre').append(prettyPrintOne(code.replace(/ ng-scope/g,"").replace(/ class="ng-scope"/g,"").replace(/\t/g,"").replace(/</g,'&lt;').replace(/>/g,'&gt;')));
	};
	return dir;
}])

.directive('edPost', ['$compile','$http','$window', function($compile, $http, $window){
	var dir = {};
	dir.scope = {
		blogid: '=content'
	};
	dir.restrict = 'E';
	dir.replace = true;
	dir.template = '<article></article>';
	dir.link = function(scope, elem) {
		$http.get('/posts/' + scope.blogid).success(function(data){
			var html = $compile(data)(scope);
			elem.append(html);
			var disqus_shortname = 'erikdonohoo'; // required: replace example with your forum shortname
			$window.disqus_identifier = scope.blogid;

			/* * * DON'T EDIT BELOW THIS LINE * * */
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
				console.log('disqs');
			})();
		});
	};
	return dir;
}])

.factory('Nav', [function(){
	var nav = {};
	nav.open = false; // Show/hide nav
	return nav;
}])

.controller('NavCtrl', ['$scope','Nav', function($scope,Nav){
	$scope.nav = Nav;
}])

.run(['$rootScope','$location','Nav',function($root,$loc){
	$root.location = $loc;
}]);