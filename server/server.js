 Meteor.publish("groceryMarket", function () {
    return GroceryMarket.find();
 });
 
Meteor.publish("groceryList", function () {
    return GroceryList.find();
 });


 Meteor.startup(function () {
 	if (GroceryMarket.find().count() === 0) {
    	var items = [
         {
         	'text': 'Beef', 
            'grocery_icon': 'beef'  
         },
 		   {  
            'text': 'Chicken', 
            'grocery_icon': 'chicken'  
    
         },
         {
         	'text': 'Banana', 
            'grocery_icon': 'banana',
         }, 
         {  
            'text': 'Eggs',  
            'grocery_icon': 'eggs'  
         },
         {
         	'text': 'Pizza',
            'grocery_icon': 'pizza'  
         }, 
         {  
            'text': 'Onions', 
            'grocery_icon': 'onion'  
         },
         {
         	'text': 'Ananas',
            'grocery_icon': 'ananas'  
         }
      ];

	    for (var i = 0; i < items.length; i++){
	      GroceryMarket.insert(items[i]);
	    }
	}
});