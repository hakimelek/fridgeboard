Template.meteorStatus.helpers({
	status: function(){
		return Meteor.status().status; 
	}, 

	connected: function(){
		return Meteor.status().connected;
	}
});