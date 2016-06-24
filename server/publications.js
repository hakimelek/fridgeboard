
Meteor.publish("myHouse", function() {
    this.autorun(function (computation) {
         if (this.userId)
         return Houses.find({_id: Meteor.users.findOne(this.userId).profile.address});
    });
});  

Meteor.publish("myroommates", function() {
    this.autorun(function (computation) {
        if (this.userId){
            var tenants = Houses.findOne({_id: Meteor.users.findOne(this.userId).profile.address},{"tenants.tenant_id":1, _id:0});
            var tenant_ids = [];
            tenants.tenants.forEach(function (tenant) {
                 if(tenant.currentTenant==true) tenant_ids.push(tenant.tenant_id);
            });
            return Meteor.users.find( { _id: { $in: tenant_ids } } );
        }
    });
});  

Meteor.publish("groceryMarket", function() {
    this.autorun(function (computation) {
        if (this.userId){
            var houseId = Meteor.users.findOne(this.userId).profile.address;
            return GroceryMarket.find({$or : [{house_id: houseId}, {default: true}]});
        };
    });
});  


Meteor.publish("groceryList", function () {
    this.autorun(function (computation) {
        if (this.userId){
            var houseId = Meteor.users.findOne(this.userId).profile.address;
            return GroceryList.find({house_id: houseId});
        };
    });
});

Meteor.publish("chat", function () {
    this.autorun(function (computation) {
        if (this.userId){
            var houseId = Meteor.users.findOne(this.userId).profile.address;
            return Messages.find({house_id: houseId});
        }
    });
});
