Template.messages.onCreated(function(){
  var self = this; 
  self.autorun(function(){
    self.subscribe('chat'); 
    self.subscribe('myroommates');
  });
});

Template.messages.helpers({
    messages: function() {
        return Messages.find({}, { sort: { time: -1}});
    }
});

Template.message.helpers({
    sender: function() {
        return Meteor.users.findOne(this.sender);
    }
});

Template.input.events = {
  'submit .messages' : function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      var message = event.target.message.value;
   	  Meteor.call("sendMessage", message);
      event.target.message.value = "";
  }
}