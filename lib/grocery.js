GroceryMarket = new Meteor.Collection("groceryMarket");
GroceryList = new Meteor.Collection("groceryList");


GroceryList.allow({
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



GroceryMarket.allow({
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
  addItem: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    houseId = Meteor.users.findOne(this.userId).profile.address; 
 
    GroceryMarket.insert({
      item: text,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
      house_id: houseId
    }, function(err, results){
      if(err) throw err; 
    });
  },

  deleteItem: function (itemId) {
    GroceryMarket.remove(itemId);
  },

  addToList: function(itemId) {
    var selected = GroceryMarket.findOne({ '_id': itemId }); 

    if(GroceryList.findOne({ '_id': itemId })){
         GroceryList.update(
          { _id: itemId },
            { $inc:
              {
                quantity: 1
              }
            }
          )
    }
    else {
      selected.quantity = 1; 
      selected.createdAt = new Date();
      selected.addedBy = Meteor.userId();
      selected.tenant_id = Meteor.userId();
      selected.houseitem = false;  
      selected.house_id = Meteor.user().profile.address; 
      GroceryList.insert(selected, function(err, results){
        if(err) throw err; 
      });  
    }

    return selected; 
  }

});

Meteor.methods({
  deleteFromList: function (itemId) {
    GroceryList.remove(itemId);
  }
});