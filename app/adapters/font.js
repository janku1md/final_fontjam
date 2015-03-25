import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Object.extend({
  findQuery: function(name, query) {
    var base = 'http://jsonp.afeld.me/?callback=?';
    var fontUrl = '&url=http://www.fontsquirrel.com/api/fontlist/';
    var searchUrl = (base + fontUrl + query);
    return ajax(searchUrl, {
      dataType: 'jsonp'
    });
  }
});
