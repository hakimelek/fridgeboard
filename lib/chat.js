Messages = new Meteor.Collection('messages');



Messages.allow({
  insert: function(userId, item){
    return userId && item.owner == userId; 
  },
  update: function(userId, item, fields, modifier){
    if(userId != item.owner)
      return; 
    return true; 
  }, 
  remove: function(userId, item){
    if(userId != item.owner)
      return; 
    return true; 
  }
}); 


Meteor.methods({
  sendMessage: function (message) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }


    Messages.insert({
      sender: Meteor.userId(),
      text: message,
      createdAt: new Date(),
      house_id: Meteor.user().profile.address
	  }, function(err, results){
      if(err) throw err; 
    });
  }
});


