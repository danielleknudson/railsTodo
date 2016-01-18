var TodosView = Marionette.CollectionView.extend({
  childView: TodoView,
  collection: Todos,
  el: '.todos',
  initialize: function() {
    this.render();
  }
});