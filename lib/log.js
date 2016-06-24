Logs = new Mongo.Collection("logs");

Meteor.methods({
  logthis: function (message) {
  	Logs.insert({
		        message: message,
		        createdAt: new Date(),
		        placeid: placeid
		      },
		      function(error, results){
		      	 if(error) throw error; 
    });
  }
});


  		