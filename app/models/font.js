import Model from 'ember-magic-man/model';

export default Model.extend({
  url: function(){
    return "http://www.fontsquirrel.com/fonts/" + this.get('family_name');
  }.property('family_name')
});
