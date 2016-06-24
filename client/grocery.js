Template.groceryMarket.onCreated(function(){
  var self = this; 
  self.autorun(function(){
    self.subscribe('groceryMarket');
  });
});


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
    	Meteor.call("addToList", this._id, function (err,selected) {
          console.log(selected);
          toastr.success(selected.item + ' is added');
      });   
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
      if(Session.get('tenantgrocerylist'))
        return GroceryList.find({tenant_id: Session.get('tenantgrocerylist')}, {sort: {createdAt: -1}});
      else{
        return GroceryList.find({houseitem: false}, {sort: {createdAt: -1}});
      }
    }
});

Template.groceryList.events({

    "click .delete": function () {
      Meteor.call("deleteFromList", this._id);
    },

    "click .tenantselector": function(){
      Session.set('tenantgrocerylist', this._id); 
    }
});


Template.groceryList.onCreated(function(){
  var self = this; 
  self.autorun(function(){
    self.subscribe('myHouse'); 
    self.subscribe('myroommates');
    self.subscribe('groceryList');
  });
});

Template.groceryList.helpers({
  myhouse: () => {
    return Houses.findOne();
  },

  myroommates: () => {
    return Meteor.users.find();
  }

});




