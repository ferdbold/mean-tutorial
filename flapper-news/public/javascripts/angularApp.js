var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',

  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }
]);

app.factory('posts', [function() {
  var o = {
    // Fake posts data
    posts: [
      {id: 0, title: 'post 1', link: '', upvotes: 5, comments: []},
      {id: 1, title: 'post 2', link: '', upvotes: 2, comments: []},
      {id: 2, title: 'post 3', link: '', upvotes: 15, comments: []},
      {id: 3, title: 'post 4', link: '', upvotes: 9, comments: []},
      {id: 4, title: 'post 5', link: '', upvotes: 4, comments: []}
    ]
  };
  return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'posts',

  function($scope, posts) {
    $scope.posts = posts.posts;

    $scope.addPost = function() {
      if (!$scope.title || $scope.title == '') { return; }

      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        // Fake comment data
        comments: [
          { author: 'Joe', body: 'Hey there', upvotes: 0 },
          { author: 'Bob', body: 'Babby', upvotes: 0 }
        ]
      });

      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    }
  }
]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',

  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function() {
      if ($scope.body === '') { return; }

      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });

      $scope.body = '';
    }
  }
]);
