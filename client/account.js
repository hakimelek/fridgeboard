Meteor.subscribe("houses");


Template.signup.events({
  'submit .signup': function(e) {
     e.preventDefault();
     var email = event.target.email.value;
     var password = event.target.password.value;
     var firstName = event.target.firstName.value;
     var lastName = event.target.lastName.value;


     var user = {
        'email': email,
        'password': password,
        'profile' : {
           'firstName': firstName, 
           'lastName' : lastName,
           'thumb' : '/images/daniel.jpg',
           'housed': false 
        }
     }

     Accounts.createUser(user, function(error){
        if(error) {
           toastr.error(error.reason, error);

        }
        else{
          Router.go('/house');
        }
     })
  }
});


Template.signin.events({
    'submit .signin': function (event) {
          event.preventDefault();
          var email = event.target.email.value;
          var password = event.target.password.value;
          
          Meteor.loginWithPassword(email,password,function(error){
              if(error) {
                toastr.error(error.reason, error);
              }
              if(!error) {
                  Router.go('/dashboard');
              }
              toastr.success(Meteor.user().profile.firstName + ' logged in')
          });
      },

      'click .signup': function(event){
        event.preventDefault(); 
        Router.go('/signup');
      },

      'click .facebook': function(event) {
          Meteor.loginWithFacebook({}, function(err){
                if (err) {
                    throw new Meteor.Error("Facebook login failed");
                }
            });
      }


});





