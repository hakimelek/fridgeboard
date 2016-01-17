Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
    }
});


Template.home.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});