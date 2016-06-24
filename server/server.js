

 Meteor.startup(function () {
 // 	if (GroceryMarket.find().count() === 0) {
 //    	var items = [
 //         {
 //         	'item': 'Beef', 
 //            'grocery_icon': 'beef',  
 //            'default': true,
 //            'createdAt': new Date()
 //         },
 // 		 {  
 //            'item': 'Chicken', 
 //            'grocery_icon': 'chicken',
 //            'default': true,
 //            'createdAt': new Date() 
    
 //         },
 //         {
 //         	'item': 'Banana', 
 //            'grocery_icon': 'banana',
 //            'default': true,
 //            'createdAt': new Date()
 //         }, 
 //         {  
 //            'item': 'Eggs',  
 //            'grocery_icon': 'eggs',
 //            'default': true,
 //            'createdAt': new Date()        
 //         },
 //         {
 //         	'item': 'Pizza',
 //            'grocery_icon': 'pizza',
 //            'default': true,
 //            'createdAt': new Date()
 //         }, 
 //         {  
 //            'item': 'Onions', 
 //            'grocery_icon': 'onion',
 //            'default': true,
 //            'createdAt': new Date()  
 //         },
 //         {
 //         	'item': 'Ananas',
 //            'grocery_icon': 'ananas',
 //            'default': true,
 //            'createdAt': new Date()  
 //         }
 //      ];
 //    for (var i = 0; i < items.length; i++){
 //      GroceryMarket.insert(items[i]);
 //    }
	// }

});


Accounts.onCreateUser(function(options, user) {
       if(!options || !user) {
        console.log('error creating user');
        return;
    } else {
        if(options.profile) {
            user.profile = options.profile;
        }
    }
    return user;
});