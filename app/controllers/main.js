/* globals $ */

import Ember from 'ember';
import ajax from 'ic-ajax';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';


export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:parse-email',
  //needs: ['user'],
  // isAuth: Ember.computed.alias('controllers.login'),
  email: '',
  password: '',
  userObject: function() {
    return {
      email: this.get('email'),
      password: this.get('password')
    };
  }.property('email', 'password'),


  actions: {
    // saveComment: function() {
    //     this.modelFor('comment').newComment.save();
    // },

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



    // login: function() {
    //   var self = this;
    //   return Ember.$.ajax({
    //     url: "https://api.parse.com/1/login",
    //     type: "GET",
    //     data: this.get('userObject')
    //   }).then(function(data) {
    //     self.set("isAuth", data);
    //     Ember.$.ajaxSetup({
    //       headers: {
    //         "X-Parse-Session-Token": data.sessionToken
    //       }
    //     });
    //     console.log("Logged in!");
    //     data.id = data.objectId;
    //     delete data.objectId;
    //     self.set('email', '');
    //     self.set('password', '');
    //     self.send('reload');
    //     self.transitionToRoute("user.profile", data);
    //   });
    // },

    // authenticate: function(credentials) {
    //   var token = credentials.sessionToken;
    //   if(token){ this.set('sessionToken', token); }
    //   var endpoint = token ? 'users/me' : 'login';
    //   var options = token ? {} : {
    //     data: {
    //       username: credentials.identification,
    //       password: credentials.password
    //     }
    //   };
    //
    //   return ajax('https://api.parse.com/1/' + endpoint, options).then(function(response) {
    //     this.set('sessionToken', response.sessionToken);
    //     return {sessionToken: response.sessionToken};
    //   }.bind(this));
    // },

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
      this.findQuery(searchTerm);

    },
   },

   findQuery: function(searchTerm) {
      var base = 'http://jsonp.afeld.me/?callback=?';
      var fontUrl = '&url=http://www.fontsquirrel.com/api/fontlist/';
      var searchUrl = (base + fontUrl + searchTerm);
      this.findAll(searchUrl);
      console.log(arguments);
      console.log(searchUrl);

    // search term display generates searchUrl:
    // http://jsonp.afeld.me/?callback=&url=http://www.fontsquirrel.com/api/fontlist/display
   },

   findAll: function(searchUrl) {
     /* jshint unused: false */
    $.getJSON(searchUrl, function(data){
      // alert('Hi');
      console.log(data);
   });
  //   return ajax(searchUrl).then(function(data) {
  //     console.log(data);
  //   });
   },

});
