import Ember from 'ember';

export function initialize(/*container, application*/) {
 Ember.$.ajaxSetup ({
    headers: {
      "X-Parse-Application-Id": 'cs7F7nKIT9OpYCKgnqiRiFQHh80I9AkULRHaJoI7',
      "X-Parse-REST-API-Key": 'ECiVuwZuMaQbEVTny4qx0XbEF493961s8Si0kk4t'
    }
});
}

export default {
 name: 'parse-tokens',
 initialize: initialize
};
