import Ember from 'ember';
import ajax from 'ic-ajax';

// // login functionality //  /////////////////////////////////////////
//
// export default Ember.ObjectController.extend({
//   // needs: ['username'],
//   // isAuth: Ember.computed.alias('controllers.login'),
//   isAuth: false,
//   email: '',
//   username: '',
//   password: '',
//   userObject: function() {
//     return {
//       email: this.get('email'),
//       password: this.get('password'),
//       username: this.get('username')
//     };
//   }.property('email', 'password', 'username'),
//
//
//   actions: {
//     resetInputs: function() {
//       this.set('email', '');
//       this.set('password', '');
//       this.set('username', '');
//     },
//
//     login: function() {
//       var self = this;
//       return Ember.$.ajax({
//         url: "https://api.parse.com/1/login",
//         type: "GET",
//         data: this.get('userObject')
//       }).then(function(data) {
//         self.set("isAuth", data);
//         Ember.$.ajaxSetup({
//           headers: {
//             "X-Parse-Session-Token": data.sessionToken
//           }
//         });
//         console.log("Logged in!");
//         data.id = data.objectId;
//         delete data.objectId;
//         self.set('email', '');
//         self.set('password', '');
//         self.set('username', '');
//         self.send('reload');
//         self.transitionToRoute("user.profile", data);
//       });
//     },
//     logout: function() {
//       this.set("isAuth", null);
//       Ember.$.ajaxSetup({
//         headers: {
//           "X-Parse-Session-Token": null
//         }
//       });
//       console.log("Logged out!");
//       this.set('email', '');
//       this.set('password', '');
//       this.set('username', '');
//       this.send("reload");
//     },
//     newUser: function() {
//       return Ember.$.ajax({
//         url: "https://api.parse.com/1/users",
//         type: "POST",
//         data: JSON.stringify(this.get('userObject'))
//       }).then(function(data) {
//         console.log(data);
//         });
//       }
//   }
// });






// // search functionality //  ////////////////////////////////////////
//
//
//
export default Ember.Controller.extend({

  actions: {
    search: function() {
      var searchTerm = this.get('searchBar');
      this.findQuery(searchTerm);
    },

},

findQuery: function(searchTerm) {
  var fontUrl = 'http://www.fontsquirrel.com/api/fontlist/';
  var searchUrl = (fontUrl + searchTerm);
  console.log(searchUrl);
  this.findAll(searchUrl);
},

findAll: function(searchUrl) {
  /* jshint unused: false */
  console.log('findAll');
  var self = this;
  return ajax({
    url: searchUrl,
    type: 'GET',
  }).then(function(data){
    console.log(data);
  });
  // return ajax(searchUrl).then(function(data){
  //   self.set('this.searchResults', data);
  //   console.log(data);
  // });
},

});



// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = 'http://updates.html5rocks.com';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}




//////  // forum functionality //  ////////////////////////////////////
