Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'home', controller: 'MainController'});

MainController = RouteController.extend({
  action: function() {
  	this.render('groceryMarket');
  }
});


Router.route('/dashboard', function () {
  this.render('dashboard');
});

Router.route('/grocery', function () {
  this.render('groceryMarket');
});

Router.route('/groceryList', function () {
  this.render('groceryList');
});
