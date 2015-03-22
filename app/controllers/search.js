import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({

  actions: {
    search: function() {
      var searchBar = this.get('searchBar');
      this.findQuery(searchBar);
    },

},

findQuery: function(searchTerm) {
  var bgbUrl = 'http://www.fontsquirrel.com/api/fontlist/all';
  var searchUrl = (bgbUrl + searchTerm);
  console.log(searchUrl);
  this.findAll(searchUrl);
},

findAll: function(searchUrl) {
  /* jshint unused: false */
  var self = this;
  return ajax(searchUrl).then(function(data){
    self.set('this.searchResults', data);
    console.log(data);
  });
},

});
