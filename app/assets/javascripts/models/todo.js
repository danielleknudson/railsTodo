var Todo = Backbone.Model.extend({
  initialize: function (options) {
    this.set('content', options.content);
  },
  methodToURL: {
    'read': '/todos/get/',
    'create': '/todos/create',
    'update': '/todos/update/'
  },
  sync: function(method, model, options) {
    var options = options || {};

    if (method === "update" || method === "read") {
      options.url = this.methodToURL[method.toLowerCase()] + model.get('id'); // update the options object
    } else {
      options.url = this.methodToURL[method.toLowerCase()]; // update the options object
    }

    return Backbone.sync.apply(this, [method, model, options]);
  }
});