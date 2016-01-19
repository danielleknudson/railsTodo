var Todo = Backbone.Model.extend({
  initialize: function (options) {
    this.set('content', options.content);
  },

  methodToURL: {
    'read': '/todos/get/',
    'create': '/todos/create',
    'update': '/todos/update/',
    'delete': '/todos/'
  },

  sync: function(method, model, options) {
    var options = options || {};

    if (method === "read" || method === "create") {
      options.url = this.methodToURL[method.toLowerCase()];
    } else {
      options.url = this.methodToURL[method.toLowerCase()] + model.get('id');
    }

    return Backbone.sync.apply(this, [method, model, options]);
  }
});