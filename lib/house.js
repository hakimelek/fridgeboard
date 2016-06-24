
Houses = new Meteor.Collection("houses");

Houses.allow({
  insert: function(userId, doc){
    return !!userId; 
  },
  update: function(userId, doc){
    return !!userId; 
  },
  remove: function(userId, doc){
    return !!userId;
  }
}); 


Meteor.methods({
  addNewUserToHouse: function (address) {
  		
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (Meteor.user().profile.housed) 
    	throw new Meteor.Error("User is already housed");

    else {
    	// If the house exists

      var houseAdded = Houses.findOne({$and: [ {"place_id": address.place_id},{"apt": address.apt}]},{"_id" : 1}); 


   	  if(houseAdded){
    		// initially, no verification. FOR TODO

          if(Houses.findOne({_id: houseAdded._id, "tenants.tenant_id": this.userId},{_id: 1})){
              Houses.update({_id: houseAdded._id, "tenants.tenant_id": this.userId},
              {
                  $set: { "tenants.$": {tenant_id: this.userId, leftAt : new Date(), currentTenant: true}}
              }, function(error, results){
                if(error) throw error; 
              }); 

              Meteor.users.update( { _id: this.userId }, 
                      { $set: { 'profile.address' : houseAdded._id }
                    }, function(err, doc){
                      if (err) throw err; 
             });

             return "Welcome back!";

          }
          else{
          	var houseInserted = Houses.update({_id: houseAdded._id},{
    		      	$push: {
    			       tenants: {tenant_id: this.userId, addedAt : new Date(), currentTenant: true} 
    			      }
    			  }, function(error, results){
              if(error) throw error; 
            });   

            console.log(houseInserted);

            Meteor.users.update( { _id: this.userId }, 
                      { $set: { 'profile.address' : houseAdded._id }
                    }, function(err, doc){
                      if (err) throw err; 
             });

             return "Welcome!";          
          }

          

    	}
    	// If the house doesn't exists, create a new one
    	else {

    		// house is empty, get it! 
    		var houseInserted = Houses.insert({
		        building_number: address.building_number,
            street_address: address.street_address ,
            city: address.city,
            region: address.region,
            postal_code: address.postal_code,
            country_name: address.country_name,
            full_address: address.full_address,
            place_id: address.place_id,
            apt: address.apt,
            createAt: new Date(),
		        tenants: [{ 
                    tenant_id: this.userId,
                    currentTenant: true,
                    addedAt: new Date()
                }]
		      },function(error, results){
		      	   if(error) throw error;
                              
              }   
	    	);



        Meteor.users.update( { _id: this.userId }, 
                  { $set: { 'profile.address' : houseInserted }
                }, function(err, doc){
                  if (err) throw err; 

        });
            
         return "Welcome! You are the first here, You should ivite your roommates!";          

    	}
    }
  },

  leaveTheHouse: function(){
    
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    else{
        var currentUser = Meteor.users.findOne(this.userId);
        var userAddressId = currentUser.profile.address; 

        Meteor.users.update( { _id: this.userId }, 
                      { $set: { 'profile.address': null }
                    }, function(err, doc){
                      if (err) throw err; 
        });

        Houses.update({_id: userAddressId, "tenants.tenant_id": this.userId},
            {
                $set: { "tenants.$": {tenant_id: this.userId, leftAt : new Date(), currentTenant: false}}
            }, function(error, results){
              if(error) throw error; 
        }); 

        return "Bye! :(";
    }
   

  }
}); 



