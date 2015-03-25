/* globals $ */

import Ember from 'ember';
import ajax from 'ic-ajax';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';


export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:parse-email',
  email: '',
  password: '',
  userObject: function() {
    return {
      email: this.get('email'),
      password: this.get('password')
    };
  }.property('email', 'password'),


  actions: {
    resetInputs: function() {
      this.set('email', '');
      this.set('password', '');
    },

    saveEdit: function() {
      var comment = this.store.createRecord('comment', {
        body: this.get('newComment')
      });
      return comment.save();
    },

    saveComment: function() {
      var comment = this.store.createRecord('comment', {
        body: this.get('newComment')
      });
      return comment.save();
    },

    destroyComment: function(comment) {
      comment.destroy();
    },

    edit: function(){
      this.set('isEditing', true);
    },

    logout: function() {
      this.set("isAuth", null);
      Ember.$.ajaxSetup({
        headers: {
          "X-Parse-Session-Token": null
        }
      });
      console.log("Logged out!");
      this.set('email', '');
      this.set('password', '');
      this.set('username', '');
      this.send("reload");
    },

    newUser: function() {
      return Ember.$.ajax({
        url: "https://api.parse.com/1/users",
        type: "POST",
        data: JSON.stringify(this.get('userObject'))
      }).then(function(data) {
        console.log(data);
      });
    },

    save: function() {
      var self = this;
      var user = this.get('model');
      user.username = user.email;
      user.save().then(function() {
        self.get('session').authenticate('authenticator:parse-email', user);
      });
      this.transitionToRoute('options');
    },

    search: function() {
      // example search term: display
      var searchTerm = this.get('searchBar');
      this.store.findQuery('font', searchTerm).then(function(response){
        console.log(response);
      });
    },
   },

});
