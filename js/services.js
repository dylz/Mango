'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var appservice = angular.module('flavrl.services', []);
 
appservice.value('version', '0.1');

appservice.service('shareTab',function(){
	var tab = '';
	var section = '';

	 return {
        getTab: function () {
            return tab;
        },
        setTab: function(value) {
            tab = value;
        },
        queueTab: function(value,vsection){
        	tab = value;
        	section = ';'+vsection;
        },
        retrieveTab: function(){
        	return tab+section;
        }
    };
});