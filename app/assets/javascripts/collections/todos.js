var Todos = Backbone.Collection.extend({
  model: Todo,
  url: '/todos',
  initialize: function () {
    this.fetch();
  }
});