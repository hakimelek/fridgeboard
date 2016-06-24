
Router.configure({
    loadingTemplate: "loading",
    notFoundTemplate: "notFound"
})



var requireLogin = function() { 
  if (!Meteor.user()) {
     // If user is not logged in render landingpage
      this.render('landing'); 
      Router.go('/');
  } 
  else {
      if (!Meteor.user()) this.render('dashboard')
      else if(!Meteor.user().profile.housed)
        this.render('house')
       //if user is logged in render whatever route was requested
      this.next(); 
  }
}


// Before any routing run the requireLogin function. 
// Except in the case of "landingpage". 
// Note that you can add more pages in the exceptions if you want. (e.g. About, Faq, contact...) 
Router.onBeforeAction(requireLogin, {except: ['landing', 'signin', 'signup', 'About', 'contact']});


Router.route('/dashboard', function () {
  this.render('dashboard');
});

Router.route('/groceryMarket', function () {
  this.render('groceryMarket');
});

Router.route('/groceryList', function () {
  this.render('groceryList');
});

Router.route('/house', function () {
  this.render('house');
});

Router.route('/chat', function () {
  this.render('chat');
});

Router.route('/profile', function () {
  this.render('profile');
});

Router.route('/', function () {
  if (!Meteor.user()) {
    this.render('layout');
  }
  else {
    this.render('dashboard');
  }
});

Router.route('/signup', function () {

  if (Meteor.user()) {
    this.render('dashboard');
  }
  
  this.render('signup');
  

});

Router.route('/signin', function () {
  if (Meteor.user()) {
    this.render('dashboard');
  }
   
  this.render('signin');

});




