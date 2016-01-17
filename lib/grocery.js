GroceryMarket = new Mongo.Collection("groceryMarket");
GroceryList = new Mongo.Collection("groceryList");


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
 
    GroceryMarket.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  deleteItem: function (itemId) {
    GroceryMarket.remove(itemId);
  },

  addToList: function(itemId) {
    var selected = GroceryMarket.findOne({ '_id': itemId }); 

    console.log(selected);
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
      selected.owner == Meteor.userId().email;
      GroceryList.insert(selected);  
    }
  }

});

Meteor.methods({
  deleteFromList: function (itemId) {
    GroceryList.remove(itemId);
  }
});