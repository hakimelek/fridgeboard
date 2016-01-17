Template.groceryMarket.helpers({
    groceryItems: function () {
      return GroceryMarket.find({}, {sort: {createdAt: -1}});
    },

    editmode:function(){
      return Session.get('editmode')
    }

});


Template.groceryMarket.events({

     "submit .new-groceryItem": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      Meteor.call("addItem", text);

      // Clear form
      event.target.text.value = "";
    },

    "click .delete": function () {
      Meteor.call("deleteItem", this._id);
    }, 
    "click .addToList": function(){
    	Meteor.call("addToList", this._id);
    },

    "click .additem": function(){
        $('.ui.modal')
          .modal('show')
        ;
    },

    "change .editmode": function(){
      Session.set('editmode',!Session.get('editmode'));
    }

});

Template.groceryList.helpers({
    groceryItems: function () {
      return GroceryList.find({}, {sort: {createdAt: -1}});
    }
});

Template.groceryList.events({

    "click .delete": function () {
      Meteor.call("deleteFromList", this._id);
    }
});



