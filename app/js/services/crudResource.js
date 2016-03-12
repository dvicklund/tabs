var handleSuccess = function(cb) {
  return function(res) {
    cb(null, res.data);
  };
};

var handleFail = function(cb) {
  return function(res) {
    cb(res.data);
  };
};

module.exports = function(app) {
  app.factory('crudResource', function($http) {
    return function(resourceName) {
      var resource = {};

      resource.getAll = function(cb) {
        $http.get('/api/' + resourceName)
          .then(handleSuccess(cb), handleFail(cb));
      };

      resource.create = function(data, cb) {
        $http.post('/api/' + resourceName, data)
          .then(handleSuccess(cb), handleFail(cb));
      };

      resource.update = function(data, cb) {
        $http.put('/api/' + resourceName + '/' + data._id, data)
          .then(handleSuccess(cb), handleFail(cb));
      };

      resource.delete = function(data, cb) {
        $http.delete('/api/' + resourceName + '/' + data._id)
          .then(handleSuccess(cb), handleFail(cb));
      };

      return resource;
    };
  });
};