angular.module('starter.services', [])

.service('LoginService', function($http, $q) {
  var url = apiBaseUrl + '/login';
    return {
        loginUser: function(credentials, success, failure) {
          // uses $q to turn function into a promise
          // reasoning being so the client side can handle either success/failure
          var deferred = $q.defer();
          var promise = deferred.promise;
          $http.post(url, {'email': credentials.email, 'password': credentials.password}).then(function(res) {
            //console.log(JSON.stringify(res));
            if((typeof res.data.token !== 'undefined')) {
              console.log("deferred is RESOLVED");
              deferred.resolve( { token: res.data.token } );
              window.localStorage.token = res.data.token;
              $http.defaults.headers.common.x_access_token = window.localStorage.token;
              //console.log("the http default should be saved as: ", $http.defaults.headers.common.x_access_token);
              //console.log("The token should now be saved as", window.localStorage.token);
            } else {
              //console.log("deferred is REJECTED");
              deferred.reject( { error: 'invalid_response' } );
            }
          }, function(err) {
              if((typeof result.data.error !== 'undefined')) {
                  deferred.reject( { error: err.data.error, status: err.status } );
              } else {
                deferred.reject( { error: 'invalid_login' } );
              }
          });
          return promise;
              // window.localStorage.token = res.data.token;
              // console.log("The token should now be saved as", window.localStorage.token);
              // return res;
            // }, function(err) {
            //   console.log(JSON.stringify(err));
            // });
        }
    };
})

.service('RegisterService', function($http, $q) {
  var url = apiBaseUrl + '/newUser';
  return {
    registerUser: function(data, success, failure) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post(url, {
          'email': data.email,
          'username': data.username,
          'password': data.password
        }).then(function(res) {
          if(data.email && data.username && data.password) {
            deferred.resolve("registration successful!");
          } else {
            deferred.reject({ error: 'invalid registration request' });
          }
        }, function(err) {
            deferred.reject({ error: err });
          });
          return promise;
        }
    };
  })

});
