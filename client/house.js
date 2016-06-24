Template.house.events({

	"submit .house": function (event) {
		  event.preventDefault();
		  if(Session.get('currentHouse')){
			Meteor.call("addNewUserToHouse", Session.get('currentHouse'), function(err, res){
				if (err) console.log(err.reason); 
				Router.go('/dashboard');
				toastr.success(res);

			});
		  }
		  else{
			alert("Please enter the house you live in");
		  }
		  
	},

	"input .apt": function(event){

		  Session.set('apt', event.currentTarget.value);

		  if(Session.get('apt')){
				if(Session.get('currentHouse')){
					var house = Session.get('currentHouse');
					house.apt = Session.get('apt');
				}
				Session.set('currentHouse', house); 
		  }
	},

	"click .leave": function(event){
		Meteor.call("leaveTheHouse", function(err, res){
			if (err) console.log(err.reason); 
			toastr.success(res);

		});
	}
});

Template.house.onRendered(function(){
	Session.set('currentHouse', null);
	Session.set('apt', null);

	GoogleMaps.init({
	  'key': 'AIzaSyDCA_KkUDHBTOQnY0f4KXwINd2eP9u78FY', //optional
	  'language': 'en',  //optional
	  'libraries': 'places'
	},
		// maps options
		function () {
			var mapOptions = {
				zoom: 6,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			 
			var autocomplete = new google.maps.places.Autocomplete(
				(document.getElementById('autocomplete')), {types: ['geocode']}
			);
 
			google.maps.event.addListener(autocomplete, 'place_changed', function () {
				var place = autocomplete.getPlace();
				if (!place.geometry) {
					return;
				}
 
				var full_address = '';

				var address;

				if (place.address_components) {
					full_address = [
						(place.address_components[0] && place.address_components[0].short_name || ''),
						(place.address_components[1] && place.address_components[1].short_name || ''),
						(place.address_components[2] && place.address_components[2].short_name || '')
					].join(' ');

					address = {
						building_number: place.address_components[0].long_name, 
						street_address:  place.address_components[1].long_name,
						city: place.address_components[2].long_name,
						region: place.address_components[4].long_name, 
						postal_code: place.address_components[6].long_name, 
						country_name: place.address_components[5].long_name,
						full_address: place.formatted_address,
						place_id: place.place_id,
						apt: Session.get('apt')
					}

					Session.set('currentHouse', address); 

				}

			});


		}


	);
}

);
   

//Meteor.subscribe("currentHouse");
//Meteor.subscribe("currentUserData");

Template.house.onCreated(function(){
	var self = this; 
	self.autorun(function(){
		self.subscribe('myHouse'); 
		self.subscribe('myroommates');
	});
});

Template.house.helpers({

	myhouse: () => {
	  return Houses.findOne();
	},

	myroommates: () => {
	  return Meteor.users.find();
	}

});

