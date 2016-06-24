Template.landing.events({
	"click .signup": function(event){
		event.preventDefault(); 
		Router.go('/signup');
	},
	
	"click .signin": function(event){
		event.preventDefault(); 
		Router.go('/signin');
	}
});


Template.menu.events({

	"click .dropdown": function(event){
	      $('.ui.dropdown')
	        .dropdown({
	          allowAdditions: true
	      });
  	},

  	"click .dashboard": function(event){
	    event.preventDefault();
	    Router.go('/dashboard');

  	},

  	"click .house": function(event){
	    event.preventDefault();
	    Router.go('/house');
  	},

	"click .profile": function(event){
	    event.preventDefault();
	    Router.go('/profile');

  	},

  	"click .logout": function(event){
        event.preventDefault();
        Meteor.logout(function(error){
          if(error) {
              toastr.error(error.reason, error);
          }
        });
        toastr.success(Meteor.user().profile.firstName + ' logged out')
        Router.go('/');
    }

});

Template.dashboard.events({

	// "click .todo": function(event){
	//     Router.go('/todo');
	 //  	},

  	"click .grocery": function(event){
	    Router.go('/groceryList');
  	},

	"click .chat": function(event){
	    Router.go('/chat');
  	},

  	// "click .calendar": function(event){
	  //   Router.go('/calendar');
  	// },

  	// "click .rules": function(event){
	  //   Router.go('/rules');
  	// },

  	

  	// "click .payment": function(event){
	  //   Router.go('/payment');
  	// }

});




