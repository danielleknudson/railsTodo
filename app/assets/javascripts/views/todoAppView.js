var TodoAppView = Marionette.View.extend({
  el: '.app.container',

  url: '/todos',

  initialize: function () {
    this.collection = new Todos();
    this.todoListView = new TodosView({collection: this.collection});

    this.listenTo(this.collection, 'change', this.render);

    this.render();
  },

  events: {
    'keyup input': 'validateFormInput'
  },

  validateFormInput: function(e){
    e.preventDefault();

    var $target = $(e.target), // let's not support IE6-8
      val = $target.val();

    if (e.which !== 13 || val.length === 0) {
      return;
    }

    this.createNewTodo(val);
  },

  createNewTodo: function (value) {
    this.collection.create({content: value});
    $('#todo-input').val('');
  }
});

var app;

$(document).ready(function() {
  app = new TodoAppView();
});