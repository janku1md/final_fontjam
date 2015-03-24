import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['user'],
  isAuth: Ember.computed.alias('controllers.login'),
  username: '',
  password: '',
  userObject: function() {
    return {
      email: this.get('email'),
      password: this.get('password'),
      username: this.get('username')
    };
  }.property('email', 'password', 'username'),
  actions: {
    resetInputs: function() {
      this.set('email', '');
      this.set('password', '');
      this.set('username', '');
    },

    login: function() {
      var self = this;
      return Ember.$.ajax({
        url: "https://api.parse.com/1/login",
        type: "GET",
        data: this.get('userObject')
      }).then(function(data) {
        self.set("isAuth", data);
        Ember.$.ajaxSetup({
          headers: {
            "X-Parse-Session-Token": data.sessionToken
          }
        });
        console.log("Logged in!");
        data.id = data.objectId;
        delete data.objectId;
        self.set('email', '');
        self.set('password', '');
        self.set('username', '');
        self.send('reload');
        self.transitionToRoute("user.profile", data);
      });
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
      }
  }
});
