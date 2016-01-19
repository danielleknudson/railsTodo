var TodosView = Marionette.CollectionView.extend({
  childView: TodoView,
  collection: Todos,
  el: '.todos',
  initialize: function() {
    this.collection.on('change', this.render);
    this.render();
  }
});